import pendulum
from django import template
from django.conf import settings
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.simple_tag
def settings_value(name):
    return getattr(settings, name, "")


@register.simple_tag
@stringfilter
def trim(value):
    return "".join(value.split())


@register.simple_tag
def get_current_year():
    today_date = pendulum.today(tz='Asia/Jakarta')
    return today_date.year