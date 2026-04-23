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
    action = tables.Column(empty_values=(), verbose_name="")

    def __init__(self, *args, **kwargs):
        super(AccountListTable, self).__init__(*args, **kwargs)
        self.counter = itertools.count(1)

    class Meta(BaseTables.Meta):
        pass
        # meta = BaseTables.Meta
        # atr = {
        #     'class': 'tes'
        # }
        # attrs = {
        #     'class': f"{meta.attrs.get('class')} {atr['class']}",
        #     'style': "min-height: 300px"
        # }


    def render_row_number(self):
        return next(self.counter)

    def render_active(self, value):
        if value:
            badge = '<iconify-icon icon="mingcute:check-fill" width="16px" height="16px" class="text-success"></iconify-icon>'
        else:
            badge = '<iconify-icon icon="maki:cross" width="16px" height="16px" class="text-danger"></iconify-icon>'
        return format_html(badge)

    def render_status(self, value):
        status = "Admin" if value else ""
        return status

    def render_action(self, value):
        btn = '''
           <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-sm btn-secondary">Left</button>
              <button type="button" class="btn btn-sm btn-secondary">Right</button>
            </div>
        '''
        return format_html(btn)