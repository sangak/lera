from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import auth_logout
from django.contrib import messages
from django.utils.translation import gettext as _
from django.views.generic import CreateView, View, FormView, TemplateView
from django.http import HttpResponseRedirect, Http404
from django_filters.views import FilterView
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse
from bootstrap_modal_forms.generic import BSModalCreateView, BSModalUpdateView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from lera.helpers import get_session
from .filters import AccountFilter
from .tables import AccountListTable

from lera.mixins import (
    NextUrlMixin, RequestFormAttachMixin, FullscreenMixin, PortalPageMixin, TableMixin, PrevUrlMixin
)

from .forms import LoginAuthenticationForm, AccountManagementCreateForm

User = get_user_model()


class LoginAuthenticationView(NextUrlMixin, RequestFormAttachMixin, FullscreenMixin, PortalPageMixin, FormView):
    form_class = LoginAuthenticationForm
    template_name = 'accounts/login-register.html'
    default_next = reverse_lazy('dashboard:index')
    redirect_authenticated_user = True
    qs = None

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = f"{self.menu_setting.get('sign_in')} | {self.page_title}"
        context['sub_title'] = f"{self.menu_setting.get('sign_in')} {_('ke sistem')} {self.app_name.get('portal_app')}"
        context['uri'] = 'login'
        context['css_body'] = "login-page bg-body-secondary"
        return context

    def form_valid(self, form):
        next_path = self.get_next_url()
        user = self.request.user
        if not user.is_profile_filled:
            pass
        if next_path is not None:
            return HttpResponseRedirect(next_path)
        return HttpResponseRedirect(self.default_next)


class LogoutRequestView(NextUrlMixin, View):
    def dispatch(self, request, *args, **kwargs):
        try:
            auth_logout(request)
        except ValueError as e:
            messages.error(request, e.message)
            pass

        next_path = self.get_next_url()
        if next_path:
            return HttpResponseRedirect(next_path)
        return super().dispatch(request, *args, **kwargs)


class AccountManagementView(LoginRequiredMixin, PortalPageMixin, TableMixin, PrevUrlMixin, FilterView):
    template_name = 'accounts/user-management.html'
    table_class = AccountListTable
    model = User
    filterset_class = AccountFilter

    def get_queryset(self):
        return User.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = f"{_('User Management')} | {self.page_title}"
        context['uri'] = 'user-management'
        context['has_breadcrumb'] = True
        context['custom_breadcrumb'] = True
        context['breadcrumb_title'] = _('user account')
        context['bootstrap_modal_forms'] = True
        context['bootstrap_modal_id'] = 'modal-create-user'
        return context


class AccountCreateView(LoginRequiredMixin, PortalPageMixin, NextUrlMixin, BSModalCreateView):
    template_name = 'accounts/create.html'
    success_url = reverse_lazy('accounts:user-management')
    form_class = AccountManagementCreateForm
    success_message = _('Account created successfully')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form_title'] = _('Pengguna Baru')
        context['form_btn_submit'] = _('Tambah User')
        return context


class AccountUpdateView(LoginRequiredMixin, PortalPageMixin, NextUrlMixin, BSModalUpdateView):
    template_name = 'accounts/create.html'
    success_url = reverse_lazy('accounts:user-management')
    form_class = AccountManagementCreateForm
    success_message = _('Account updated successfully')

    def get_object(self, queryset = ...):
        uid = self.kwargs.get('uid')
        qs = User.objects.filter(uid=uid)
        if qs.exists():
            return qs.first()
        raise Http404

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form_title'] = _('Update Data Pengguna')
        context['form_btn_submit'] = _('Update')
        return context