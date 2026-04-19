from django.views.generic import TemplateView, CreateView
from django.utils.translation import gettext_lazy as _
from django.urls import reverse_lazy
from lera.mixins import LandingDataMixin
from .forms import ContactUsForm


class LandingPageView(LandingDataMixin, TemplateView):
    template_name = 'landing/default.html'

    def get_context_data(self, **kwargs):
        context = super(LandingPageView, self).get_context_data(**kwargs)
        context['page_title'] = f"{self.app_name.get('portal_app')} | {self.page_title}"
        context['uri'] = 'landing'
        return context


class ProgramPageView(LandingDataMixin, TemplateView):
    template_name = 'landing/program.html'

    def get_context_data(self, **kwargs):
        context = super(ProgramPageView, self).get_context_data(**kwargs)
        context['page_title'] = f"{_('Program')} | {self.page_title}"
        context['uri'] = 'program'
        context['has_breadcrumb'] = True
        context['breadcrumb_title'] = _('Apa yang Kami Lakukan')
        context['breadcrumb_subtitle'] = _('Pengalaman Kami')
        context['breadcrumbs'] = (
            {'link': f'{reverse_lazy("landing:index")}', 'title': _('Beranda')},
            {'link': '#', 'title': _('Program')},
        )
        return context


class AboutUsPageView(LandingDataMixin, TemplateView):
    template_name = 'landing/about-us.html'

    def get_context_data(self, **kwargs):
        context = super(AboutUsPageView, self).get_context_data(**kwargs)
        context['page_title'] = f"{_('Tentang Kami')} | {self.page_title}"
        context['uri'] = 'about-us'
        context['has_breadcrumb'] = True
        context['breadcrumb_title'] = _('Tentang Kami')
        context['breadcrumb_subtitle'] = 'Siapa Kami?'
        context['breadcrumbs'] = (
            {'link': f'{reverse_lazy("landing:index")}', 'title': _('Beranda')},
            {'link': '#', 'title': _('Tentang Kami')},
        )
        return context


class ContactUsPageView(LandingDataMixin, CreateView):
    form_class = ContactUsForm
    template_name = 'landing/contact-us.html'
    success_url = reverse_lazy('landing')

    def dispatch(self, request, *args, **kwargs):
        return super(ContactUsPageView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = f"{_('Hubungi Kami')} | {self.page_title}"
        context['uri'] = 'contact-us'
        context['has_breadcrumb'] = True
        context['breadcrumb_title'] = _('Hubungi Kami')
        context['breadcrumb_subtitle'] = 'Get in touch'
        context['breadcrumbs'] = (
            {'link': f'{reverse_lazy("landing:index")}', 'title': _('Beranda')},
            {'link': '#', 'title': _('Hubungi Kami')},
        )
        return context