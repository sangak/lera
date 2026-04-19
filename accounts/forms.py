from django import forms
from django.contrib.auth import get_user_model, password_validation, login, authenticate
from django.utils.safestring import mark_safe
from django.utils.translation import gettext as _
from bootstrap_modal_forms.forms import BSModalModelForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Row, Column
from crispy_forms.bootstrap import StrictButton
from lera.variables import (
    LABEL_TEXT, menu_setting
)
from lera.helpers import BaseModelForm, CustomPasswordLogin, email_validator, split_name

User = get_user_model()


class LoginAuthenticationForm(forms.Form):
    email = forms.CharField(
        widget=forms.EmailInput(
            attrs={
                'placeholder': 'Email',
                'autofocus': True,
                'autocomplete': 'off',
                'spellcheck': False,
                'id': 'email',
                'data-pristine-required': 'true',
                'data-pristine-required-message': LABEL_TEXT.get('no_blank') % 'Email',
                'data-pristine-email-message': _('Masukkan alamat email yang benar'),
                'tabindex': 1
            }
        ),
        required=False
    )

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'placeholder': menu_setting.get('password'),
                'id': 'password',
                'tabindex': 1
            }
        ),
        required=False,
        help_text=mark_safe(f'<a class="btn-link fw-medium small ms-auto me-0 mt-1" href="#">{_("Lupa kata sandi?")}</a>')
    )

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(LoginAuthenticationForm, self).__init__(*args, **kwargs)
        sign_in = menu_setting.get('sign_in')
        self.helper = FormHelper()
        self.helper.form_show_labels = False
        self.helper.form_id = 'login-form'
        self.helper.form_class = 'need-validate'
        self.helper.field_class = 'form-group'
        self.helper.layout = Layout(
            Row(
                Column('email')
            ),
            Row(
                Column(CustomPasswordLogin('password'))
            ),
            Row(
                Column(
                    StrictButton(sign_in, type="submit", css_class='btn btn-primary w-100')
                ),
                css_class='mt-3'
            )
        )

    def clean_password(self):
        password = self.cleaned_data.get('password')
        email = self.cleaned_data.get('email')

        if not password:
            raise forms.ValidationError(LABEL_TEXT.get('no_blank') % menu_setting.get('password'))

        user = authenticate(self.request, username=email, password=password)
        if user is None:
            qs = User.objects.is_inactive(email)
            if qs:
                self.add_error('email', _('Silahkan cek tautan email untuk verifikasi'))
                return False
            else:
                raise forms.ValidationError(_('Email atau kata sandi salah!'))
        login(self.request, user)
        return user


class AccountManagementCreateForm(BaseModelForm, BSModalModelForm):
    first_name = forms.CharField(
        label=mark_safe(_('Nama depan') + LABEL_TEXT.get('required')),
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': _('Nama depan'),
                'autofocus': True,
                'autocomplete': 'off',
                'spellcheck': False,
                'id': 'first_name',
                'data-pristine-required': 'true',
                'data-pristine-required-message': LABEL_TEXT.get('no_blank') % 'Nama depan',
                'tabindex': 1
            }
        )
    )
    last_name = forms.CharField(
        label=_('Nama belakang'),
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': _('Nama belakang'),
                'id': 'last_name',
                'tabindex': 2
            }
        )
    )

    email = forms.CharField(
        label=mark_safe('Email' + LABEL_TEXT.get('required')),
        required=False,
        widget=forms.EmailInput(
            attrs={
                'placeholder': _('Email'),
                'data-pristine-required': 'true',
                'data-pristine-required-message': LABEL_TEXT.get('no_blank') % 'Email',
                'data-pristine-email-message': _('Masukkan alamat email yang benar'),
                'tabindex': 3
            }
        )
    )

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

    def __init__(self, *args, **kwargs):
        super(AccountManagementCreateForm, self).__init__(*args, **kwargs)
        meta = self.Meta.model._meta
        self.helper.form_class = 'need-validate'
        self.helper.form_id = 'frm-add-account'
        first_length = meta.get_field('first_name').max_length
        last_length = meta.get_field('last_name').max_length
        self.fields['first_name'].widget.attrs['maxlength'] = first_length
        self.fields['last_name'].widget.attrs['maxlength'] = last_length
        self.helper.field_class = 'form-group'
        # self.helper.field_template = 'bootstrap5/custom-field.html'
        self.helper.layout = Layout(
            Row(
                # Column('first_name', css_class='col-md-6', template='bootstrap5/custom-field.html'),
                Column('first_name', css_class='col-md-6'),
                # Column('last_name', css_class='col-md-6', template='bootstrap5/custom-field.html'),
                Column('last_name', css_class='col-md-6'),
            ),
            Row(
                Column('email')
            )
        )