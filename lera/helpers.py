import re
import pendulum
from uuid import uuid4
from babel.numbers import format_decimal
from decimal import Decimal
import django_tables2 as tables
from crispy_forms.helper import FormHelper
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, validate_email
from django.utils.translation import gettext as _
from django.db.models import Q
from django.utils.html import format_html
from django.forms.models import ModelChoiceIterator
from crispy_forms.layout import BaseInput, Field
from crispy_forms.utils import get_template_pack
from django_select2 import forms as s2form
from django.template.defaultfilters import filesizeformat
from django import forms
from django.db import models

from lera.variables import menu_setting


class BaseModel(models.Model):
    uid = models.CharField(max_length=64, editable=False, unique=True, db_index=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-date_updated']


class BaseModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(BaseModelForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.field_class = 'form-group'


class BaseTables(tables.Table):

    class Meta:
        no_data = menu_setting.get('no_data_available')
        empty_text = format_html(f'<div class="d-block text-center">{no_data}</div>')
        attrs = {
            'class': 'table table-striped table-hover',
            'th': {
                'class': 'fw-bold'
            }
        }
        row_attrs = {
            "data-id": lambda record: record.uid,
        }


class Submit(BaseInput):
    input_type = 'submit'

    def __init__(self, *args, **kwargs):
        self.field_classes = "submit submitButton" if get_template_pack() == "uni_form" else "btn"
        super().__init__(*args, **kwargs)


class CustomCheckBox(Field):
    template = 'bootstrap5/custom_checkbox.html'


class CustomToggle(Field):
    template = 'bootstrap5/custom_toggle.html'


class CustomPasswordLogin(Field):
    template = 'bootstrap5/custom-password-login.html'


class DjangoModelSelect2Widget(s2form.ModelSelect2Widget):
    def build_attrs(self, base_attrs, extra_attrs=None):
        default_attrs = {
            "data-minimum-input-length": 0,
            # 'data-minimum-results-for-search': 'Infinity',
            'data-allow-clear': False
        }
        default_attrs.update(base_attrs)
        attrs = super().build_attrs(default_attrs, extra_attrs)
        return attrs


class DjangoSelect2Widget(s2form.Select2Widget):
    def build_attrs(self, base_attrs, extra_attrs=None):
        default_attrs = {
            "data-minimum-input-length": 0,
            'data-minimum-results-for-search': 0,
            'data-allow-clear': False
        }
        default_attrs.update(base_attrs)
        attrs = super().build_attrs(default_attrs, extra_attrs)
        return attrs


class DjangoHeavySelect2Widget(s2form.HeavySelect2Widget):

    def build_attrs(self, base_attrs, extra_attrs=None):
        default_attrs = {
            "data-ajax--url": self.get_url(),
            "data-ajax--cache": "true",
            "data-ajax--type": "GET",
            "data-minimum-input-length": 0,
            'data-minimum-results-for-search': 'Infinity',
            'data-allow-clear': False
        }
        default_attrs.update(base_attrs)
        attrs = super().build_attrs(default_attrs, extra_attrs)
        return attrs

    def optgroups(self, name, value, attrs=None):
        default = (None, [], 0)
        groups = [default]
        has_selected = False
        selected_choices = {str(v) for v in value}
        if not self.is_required and not self.allow_multiple_selected:
            default[1].append(self.create_option(name, "", "", False, 0))
        if not isinstance(self.choices, ModelChoiceIterator):
            return super().optgroups(name, value, attrs=attrs)
        selected_choices = {
            c for c in selected_choices if c not in self.choices.field.empty_values
        }
        field_name = self.choices.field.to_field_name or "pk"
        query = Q(**{"%s__in" % field_name: selected_choices})
        for obj in self.choices.queryset.filter(query):
            option_value = self.choices.choice(obj)[0]
            option_label = self.label_from_instance(obj)

            selected = str(option_value) in value and (
                    has_selected is False or self.allow_multiple_selected
            )
            if selected is True and has_selected is False:
                has_selected = True
            index = len(default[1])
            subgroup = default[1]
            subgroup.append(
                self.create_option(
                    name, option_value, option_label, selected_choices, index
                )
            )
        return groups

    def label_from_instance(self, obj):
        return str(obj)


class PercentageField(forms.FloatField):
    widget = forms.TextInput(
        attrs={'class': 'percent-input'}
    )

    def to_python(self, value):
        val = super().to_python(value)
        if is_number(val):
            return val / 100
        return val

    def prepare_value(self, value):
        val = super().prepare_value(value)
        if is_number(val) and not isinstance(val, str):
            return str((float(val) * 100))
        return val


class CurrencyField(forms.DecimalField):
    template = 'bootstrap5/currency_field.html'

    widget = forms.TextInput(
        attrs={'class': 'currency-input'}
    )

    def to_python(self, value):
        val = super().to_python(value)
        _string = str(val).replace('.', '').replace(',', '.')
        if is_number(float(_string)):
            return Decimal(_string)
        return val

    def prepare_value(self, value):
        val = super().prepare_value(value)
        if is_number(val) and not isinstance(val, str):
            return str(format_decimal(val, format='#,##0.##', locale='id'))
        return val


class RestrictedFileField(forms.FileField):
    """
    Same as FileField, but you can specify:
    * content_types - list containing allowed content_types. Example: ['application/pdf', 'image/jpeg']
    * max_upload_size - a number indicating the maximum file size allowed for upload.
        2.5MB - 2621440
        5MB - 5242880
        10MB - 10485760
        20MB - 20971520
        50MB - 5242880
        100MB - 104857600
        250MB - 214958080
        500MB - 429916160
"""

    def __init__(self, *args, **kwargs):
        self.content_types = kwargs.pop("content_types")
        self.max_upload_size = kwargs.pop("max_upload_size")

        super(RestrictedFileField, self).__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        file = super(RestrictedFileField, self).clean(data, initial)

        try:
            content_type = file.content_type
            if content_type in self.content_types:
                if file.size > self.max_upload_size:
                    raise ValidationError(_('Please keep filesize under %s. Current filesize %s') % (
                        filesizeformat(self.max_upload_size), filesizeformat(file.size)))
            else:
                raise ValidationError(_('Filetype not supported.'))
        except AttributeError:
            pass

        return data


class SelectField(Field):
    template = 'bootstrap5/layout/select_field.html'


def is_number(s):
    if s is None:
        return False
    try:
        float(s)
        return True
    except KeyError:
        return False


def email_validator(email):
    from django.core.exceptions import ValidationError
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False


def split_name(full_name):
    name_list = full_name.split(" ")
    first_name = None
    last_name = None
    for num, name in enumerate(name_list):
        if num == 0:
            first_name = name
        else:
            if last_name is None:
                last_name = name
            else:
                last_name += " " + name
    return first_name, last_name


def check_nomer_hp():
    pesan = _('Masukkan nomer hp yang benar')
    return RegexValidator(r"^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$", message=pesan)


def check_npwp(npwp):
    npwp_ = re.sub(r"\(|\)|\.|-|\s", "", npwp)
    pattern = re.compile(r"[\d]{15}$")
    npwp_pattern = r"([\d]{2})([\d]{3})([\d]{3})(\d)([\d]{3})([\d]{3})"
    try:
        cocok = pattern.match(npwp_)
        if cocok:
            return True, re.sub(npwp_pattern, r"\1.\2.\3.\4-\5.\6", npwp_)
        return False, None
    except KeyError as error:
        return False, error


def simpan_npwp(npwp):
    npwp_ = re.sub(r"\(|\)|\.|-|\s", "", npwp)
    pattern = re.compile(r"[\d]{15}$")
    try:
        cocok = pattern.match(npwp_)
        if cocok:
            return npwp_
        return None
    except KeyError:
        pass


def npwp_to_daftar(nomer):
    jml = [2, 3, 3, 1, 3, 3]
    daftar = []
    try:
        for i in jml:
            npwp_ = nomer[:i]
            nomer = nomer[i:]
            daftar.append(npwp_)
        if len(daftar) > 0:
            return daftar
    except KeyError:
        pass
    return None


def check_nik(nik):
    nik_ = re.sub(r"\(|\)|\.|-|\s", "", nik)
    pattern = re.compile(
        r"^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$")
    try:
        cocok = pattern.match(nik_)
        if cocok:
            return True, nik_
        return False, None
    except KeyError as error:
        return False, error


def html_escape(teks):
    html_escape_table = {
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
        ">": "&gt;",
        "<": "&lt;",
    }
    return ";".join(html_escape_table.get(c, c) for c in teks)


def remove_session(request, session_name):
    try:
        del request.session[session_name]
    except KeyError:
        pass


def get_session(request, session_name):
    if session_name in request.session:
        session = request.session[session_name]
        remove_session(request, session_name)
        return session
    else:
        return None


def get_current_full_date(loc='Asia/Jakarta', bahasa=None):
    dt = pendulum.today(tz=loc)
    bhs = 'id' if bahasa is None else bahasa
    return dt.format('DD MMMM YYYY', locale=bhs)


def get_locale_date(tanggal):
    try:
        year = tanggal.year
        month = tanggal.month
        day = tanggal.day
        dt = pendulum.date(year, month, day)
        return dt.format('DD/MM/YYYY')
    except:
        tgl = pendulum.today(tz='Asia/Jakarta')
        return tgl.format('DD/MM/YYYY')


def check_country_code(tel=None):
    if tel[0] == '+':
        if tel[:3] == '+62':
            return tel
    elif tel[0] == '0':
        return '+62' + tel[1:]


def model_to_dict(instance):
    data = {}
    for key, title in instance:
        data[key] = title
    return data


def url_validator(url_path):
    url_field = forms.URLField()
    try:
        _ = url_field.clean(url_path)
    except ValidationError as err:
        return False, err

    return True, None


def check_date_valid(str_date: str):
    date_list = str_date.split('/')
    if not len(date_list) == 3:
        correct_date = False
        new_date = None
        return correct_date, new_date

    try:
        day = date_list[0]
        month = date_list[1]
        year = date_list[2]
        new_date = pendulum.date(int(year), int(month), int(day))
        correct_date = True
        return correct_date, new_date

    except ValueError as err:
        print(err)
        new_date = None
        correct_date = False
        return correct_date, new_date