from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext as _
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import redirect
from django.urls import reverse_lazy
from lera.mixins import NextUrlMixin, RequestFormAttachMixin, PortalPageMixin

User = get_user_model()


class DashboardView(LoginRequiredMixin, PortalPageMixin, TemplateView):
    template_name = 'dashboard/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = f'Dashboard | {self.page_title}'
        context['uri'] = 'dashboard'
        context['has_breadcrumb'] = True
        context['custom_breadcrumb'] = True
        context['breadcrumb_title'] = 'dashboard'
        return context
