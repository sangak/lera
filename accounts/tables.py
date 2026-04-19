import django_tables2 as tables
from django.utils.html import format_html
from django.contrib.auth import get_user_model
from django.utils.translation import gettext as _
from lera.helpers import BaseTables
from lera.variables import LABEL_TEXT
import itertools

User = get_user_model()


class AccountListTable(BaseTables):
    row_number = tables.Column(empty_values=(), verbose_name=_('No.'), orderable=False, attrs={
        "th": {
            'style': 'width: 40px',
        },
        "td": {
            'class': 'text-center',
        }
    })
    full_name = tables.Column(accessor='full_name', verbose_name=_('Nama Lengkap'),
                              order_by=("first_name", "last_name"), attrs={
            "th": {
                "style": "min-width: 120px",
            }
        })
    email = tables.Column(accessor='email')
    active = tables.Column(accessor='is_active', verbose_name=_('Aktif'), attrs={
        "th": {
            "style": "width: 65px",
        },
        "td": {
            "class": "text-center",
        }
    })
    status = tables.Column(accessor='is_admin', verbose_name=_('Status'), attrs={
        "th": {"style": "width: 80px"},
        "td": {"class": "text-center"},
    })

    def __init__(self, *args, **kwargs):
        super(AccountListTable, self).__init__(*args, **kwargs)
        self.counter = itertools.count(1)

    class Meta(BaseTables.Meta):
        attrs = {
            'tbody': {
                'hx_post': 'cek'
            }
        }

    def render_row_number(self):
        return next(self.counter)

    def render_active(self, value):
        badge = '<iconify-icon icon="mingcute:check-fill" width="16px" height="16px" class="text-success"></iconify-icon>' if value == True else '<iconify-icon icon="maki:cross" width="16px" height="16px" class="text-danger"></iconify-icon>'
        return format_html(badge)

    def render_status(self, value):
        status = "Admin" if value else ""
        return status