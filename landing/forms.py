from django import forms
from django.utils.translation import gettext as _
from crispy_forms.helper import FormHelper
from django.utils.safestring import mark_safe
from crispy_forms.layout import Layout, Row, Column
from crispy_forms.bootstrap import StrictButton, PrependedText

from landing.models import ContactUs
from lera.variables import LABEL_TEXT, menu_setting


class ContactUsForm(forms.ModelForm):
    full_name = forms.CharField(
        label=mark_safe(_('Nama Lengkap') + LABEL_TEXT.get('required')),
        widget=forms.TextInput(),
        required=False,
    )
    email = forms.EmailField(
        label=mark_safe(_('Email') + LABEL_TEXT.get('required')),
        widget=forms.EmailInput(),
        required=False
    )
    subject = forms.CharField(
        label=_('Perihal'),
        widget=forms.TextInput(),
        required=False
    )
    comment = forms.CharField(
        label=mark_safe(_('Komentar') + LABEL_TEXT.get('required')),
        widget=forms.Textarea(
            attrs={
                'rows': 3,
                'class': 'noresize'
            }
        ),
        required=False
    )

    class Meta:
        model = ContactUs
        fields = ['full_name', 'email', 'subject', 'comment']

    def __init__(self, *args, **kwargs):
        super(ContactUsForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('full_name', css_class='col-md-6'),
                Column('email', css_class='col-md-6'),
            ),
            Row(
                Column('subject', css_class='col-md-12'),
            ),
            Row(
                Column('comment', css_class='col-md-12'),
            ),
            Row(
                Column(
                    StrictButton(_('Kirim Komentar'), type='submit', css_class='btn-primary'),
                ),
                css_class='text-center'
            )
        )