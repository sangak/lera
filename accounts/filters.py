import django_filters
from django import forms
from django.db.models import Q
from django.utils.translation import gettext as _
from .models import User


class AccountFilter(django_filters.FilterSet):
    q = django_filters.CharFilter(
        method='search_filter', label='', field_name='search',
        widget=forms.TextInput(
            attrs={
                'class': 'form-control form-filter',
                'placeholder': _('Ketik yang anda cari'),
                'data-frm': 'frm-filter-resources',
                'autocomplete': 'off',
                'autofocus': 'autofocus',
            }
        )
    )

    class Meta:
        model = User
        fields = ['q']

    def search_filter(self, queryset, name, value):
        return queryset.filter(
            Q(first_name__icontains=value) |
            Q(last_name__icontains=value) |
            Q(email__icontains=value)
        )