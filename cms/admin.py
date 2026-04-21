from django.contrib import admin
from .models import (
    Language, Menu, SubMenu, Breadcrumb,
    Page, Section, SubSection, Button, Detail
)

admin.site.register(Language)
admin.site.register(Menu)
admin.site.register(SubMenu)
admin.site.register(Breadcrumb)

admin.site.register(Button)
admin.site.register(Detail)
admin.site.register(Page)
admin.site.register(Section)
admin.site.register(SubSection)
