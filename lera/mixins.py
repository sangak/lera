from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.csrf import csrf_exempt
from django_tables2 import SingleTableMixin
from django_tables2.paginators import LazyPaginator
from cms.models import Menu
from lera.contents import contents
from lera.helpers import get_session
from lera.variables import LABEL_TEXT, menu_setting, app_name


class AjaxFormMixin(object):
    def form_invalid(self, form):
        response = super().form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            data = {
                'message': "Successfully submitted form data"
            }
            return JsonResponse(data)
        else:
            return response


class RequestFormAttachMixin(object):
    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs


class NextUrlMixin(object):
    default_next = '/'

    def get_next_url(self):
        request = self.request
        next_ = request.GET.get('next')
        next_post = request.POST.get('next')
        redirect_path = next_ or next_post or None
        if url_has_allowed_host_and_scheme(redirect_path, request.get_host()):
            return redirect_path
        return self.default_next


class PrevUrlMixin(object):
    default_prev = '/'

    def get_prev_url(self):
        request = self.request
        self.default_prev = request.path
        request.session['prev_url'] = self.default_prev
        return self.default_prev

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['prev_url'] = self.get_prev_url()
        return context


class BackToPreviousUrlMixin(object):
    def get_success_url(self):
        if "prev_url" in self.request.session:
            prev_url = get_session(self.request, "prev_url")
            return prev_url
        return self.success_url


class CsrfExemptMixin(object):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class GetHxMixin(object):
    template_name = 'partials/update-partials.html'
    is_htmx = False

    def get(self, request, *args, **kwargs):
        super().get(request, *args, **kwargs)
        is_htmx = request.hearders.get('HX-Request')
        context = {
            'form': self.form_class(instance=self.get_object())
        }
        if is_htmx and request.method == 'GET':
            return render(request, self.template_name, context)
        return HttpResponse('No data available')

    def form_valid(self, form):
        obj = self.get_object()
        form.save()
        request = self.request
        if request.htmx and request.method == 'GET':
            context = {
                "form": self.form_class(instance=obj)
            }
            return render(request, self.template_name, context)
        return HttpResponse('No data available')


class GetObjHxMixin(object):
    template_name = 'partials/update-partials.html'
    is_htmx = False

    def get(self, request, *args, **kwargs):
        super().get(request, *args, **kwargs)
        is_htmx = request.headers.get('HX-Request')
        context = {
            'obj': self.get_object()
        }
        if is_htmx and request.method == 'GET':
            return render(request, self.template_name, context)
        return HttpResponse('No data available')


class DefaultMixin(object):
    previous = None
    template_name = 'base/index.html'

    def __init__(self, *args, **kwargs):
        self.app_name = app_name
        self.menu_setting = menu_setting
        self.page_title = app_name.get('tagline')
        base_url = settings.BASE_URL
        self.endpoint = f"http://{base_url}" if base_url == '127.0.0.1:8000' else base_url
        self.content = contents
        self.menu = None

    def dispatch(self, request, *args, **kwargs):
        self.previous = request.META.get('HTTP_REFERER')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['app_name'] = self.app_name
        context['end_point'] = self.endpoint
        context['menu_setting'] = self.menu_setting
        context['label_text'] = LABEL_TEXT
        context['page_title'] = self.page_title
        context['full_screen'] = False
        context['landing_page'] = True
        context['portal_page'] = False
        context['show_navbar'] = True
        context['navbar_type'] = 'main'
        context['show_searchbar'] = True
        context['show_footer'] = True
        context['mixins'] = None
        context['css_body'] = None
        context['has_breadcrumb'] = False
        context['breadcrumb_title'] = None
        context['breadcrumb_subtitle'] = None
        context['has_meta'] = False
        context['meta_name'] = dict()
        context['menus'] = Menu.objects.filter(language__code=self.request.LANGUAGE_CODE)
        context['path_info'] = f"{self.request.path_info}".replace("/", "")
        return context


class FullscreenMixin(DefaultMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['fullscreen'] = True
        context['landing_page'] = False
        context['portal_page'] = True
        context['show_navbar'] = False
        context['show_sidebar'] = False
        context['show_searchbar'] = False
        context['show_footer'] = False
        return context


class LandingDataMixin(DefaultMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['mixins'] = 'landing'
        context['has_meta'] = True
        context['meta_name'] = [
            {
                'name': 'description',
                'content': f"{self.page_title}"
            },
            {
                'name': 'author',
                'content': f"{self.page_title}"
            }
        ]
        # coba = {'name': 'coba', 'content': 'tes'}
        # context['meta_name'].append(coba)
        return context


class PortalPageMixin(DefaultMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['portal_page'] = True
        context['show_sidebar'] = True
        context['uri'] = 'portal'
        context['mixins'] = 'portal'
        context['css_body'] = "layout-fixed sidebar-expand-lg sidebar-open bg-body-tertiary"
        context['navbar_type'] = 'portal'
        context['app_header'] = True
        context['has_breadcrumb'] = False
        context['breadcrumb_title'] = context['uri']
        context['custom_breadcrumb'] = False
        return context


class TableMixin(SingleTableMixin):
    table_pagination = None

    def __init__(self, per_page=10):
        self.table_pagination = {
            'per_page': per_page,
            'pagination_class': LazyPaginator
        }

    def get_table(self, **kwargs):
        table = super().get_table(**kwargs)
        table.request = self.request
        return table