import json
import asyncio
from asgiref.sync import sync_to_async
from django.conf import settings
from django.conf.urls.i18n import is_language_prefix_patterns_used
from django.contrib.messages import get_messages
from django.urls import get_script_prefix, is_valid_path
from django.utils import translation
from django.utils.cache import patch_vary_headers
from django.http import HttpResponseRedirect, JsonResponse
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth import logout
from django.shortcuts import redirect
from importlib import import_module


class DefaultLanguageMiddleware(MiddlewareMixin):
    response_redirect_class = HttpResponseRedirect

    @staticmethod
    def process_request(request):
        if "HTTP_ACCEPT_LANGUAGE" in request.META:
            del request.META["HTTP_ACCEPT_LANGUAGE"]

        language = settings.LANGUAGE_CODE
        user = getattr(request, 'user', None)
        if user.is_authenticated:
            language = user.profile.language
        translation.activate(language)

        request.LANGUAGE_CODE = translation.get_language()

    def process_response(self, request, response):
        language = translation.get_language()
        language_from_path = translation.get_language_from_path(request.path_info)
        urlconf = getattr(request, 'urlconf', settings.ROOT_URLCONF)
        (
            i18n_patterns_used,
            prefixed_default_language,
        ) = is_language_prefix_patterns_used(urlconf)

        if (response.status_code == 404 and not language_from_path
            and i18n_patterns_used and prefixed_default_language):

            language_path = "/%s%s" % (language, request.path_info)
            path_valid = is_valid_path(language_path, urlconf)
            path_needs_slash = not path_valid and (
                settings.APPEND_SLASH and not language_path.endswith('/')
                and is_valid_path("%s/" % language_path, urlconf)
            )

            if path_valid or path_needs_slash:
                script_prefix = get_script_prefix()
                language_url = request.get_full_path(
                    force_append_slash=path_needs_slash
                ).replace(script_prefix, "%s%s/" % (script_prefix, language), 1)
                redirect = self.response_redirect_class(language_url)
                patch_vary_headers(redirect, ("Accept-Language", "Cookie"))
                return redirect

        if not (i18n_patterns_used and language_path):
            patch_vary_headers(response, ("Accept-Language",))
        response.headers.setdefault("Content-Language", language)
        return response


class AjaxMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        super().__init__(get_response)
        self.get_response = get_response

    def __call__(self, request):
        def is_ajax():
            return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

        request.is_ajax = is_ajax.__get__(request)
        response = self.get_response(request)
        return response


class HtmxMessageMiddleware(MiddlewareMixin):
    @staticmethod
    def process_response(request, response):
        if response.status_code == 404:
            pass

        if "HX-Request" in request.headers:
            tags = ['success', 'info', 'warning']
            for x in tags:
                for message in get_messages(request):
                    if x in message.tags:
                        msg = message.tags
                        title = msg.replace(x, '').strip()
                        response.headers['HX-Trigger'] = json.dumps({
                            'messages': [
                                {"message": message.message, "tag": x, "title": title}
                            ]
                        })
        return response


SessionStore = import_module(settings.SESSION_ENGINE).SessionStore


# class SessionExpiryMiddleware(MiddlewareMixin):
#
#     def __init__(self, get_response):
#         self.get_response = get_response
#         super().__init__(get_response)
#
#     async def __call__(self, request):
#         user = getattr(request, 'user', None)
#
#         if not request.user.is_authenticated:
#             return await self.get_response(request)
#
#         if user and user.is_authenticated:
#             session = await sync_to_async(getattr)(user, 'active_session')
#             if session:
#                 is_expired = await sync_to_async(session.is_expired)()
#                 if is_expired:
#                     await sync_to_async(logout)(request)
#                     await sync_to_async(session.delete)()
#                     return await sync_to_async(redirect)("/")
#                 else:
#                     await sync_to_async(session.refresh_expiry)(duration_minutes=30)
#
#         response = await self.get_response(request)
#         return response
#
#
# class SingleSessionMiddleware(MiddlewareMixin):
#     def __init__(self, get_response):
#         self.get_response = get_response
#         self.is_async = asyncio.iscoroutinefunction(get_response)
#         super().__init__(get_response)
#
#     async def __call__(self, request):
#         if request.user.is_authenticated:
#             await self._check_single_session(request)
#
#         if self.is_async:
#             response = await self.get_response(request)
#         else:
#             response = await sync_to_async(self.get_response, thread_sensitive=True)(request)
#
#         return response
#
#     async def _check_single_session(self, request):
#         user_session = await sync_to_async(self._get_user_session)(request.user)
#         current_key = request.session.session_key
#
#         if not user_session or user_session.session_key != current_key:
#             await sync_to_async(logout, thread_sensitive=True)(request)
#
#     def _get_user_session(self, user):
#         try:
#             return UserSession.objects.get(user=user)
#         except UserSession.DoesNotExist:
#             return None
#
#
# class UnifiedSingleMiddleware(MiddlewareMixin):
#     def __init__(self, get_response):
#         self.get_response = get_response
#         self.is_async = asyncio.iscoroutinefunction(get_response)
#         super().__init__(get_response)
#
#     async def __call__(self, request):
#         result = await self._check_user_auth_state(request)
#         if isinstance(result, JsonResponse):
#             return result
#
#         if self.is_async:
#             response = await self.get_response(request)
#         else:
#             response = await sync_to_async(self.get_response, thread_sensitive=True)(request)
#
#         return response
#
#     async def _check_user_auth_state(self, request):
#         if not request.user.is_authenticated:
#             return None
#
#         user = request.user
#         user_session = await sync_to_async(self._get_user_session)(user)
#
#         if request.session.session_key:
#             if not user_session or user_session.session_key != request.session.session_key:
#                 await sync_to_async(logout, thread_sensitive=True)(request)
#                 return JsonResponse(
#                     {"detail": "Your token is no longer valid."}, status=401
#                 )
#
#         token = self._get_token_from_header(request)
#         if token:
#             if not user_session or user_session.token_key != token:
#                 return JsonResponse(
#                     {"detail": "Your token is no longer valid."}, status=401
#                 )
#
#         return None
#
#
#     async def _check_single_session(self, request):
#         user_session = await sync_to_async(self._get_user_session)(request.user)
#         current_key = request.session.session_key
#
#         if not user_session or user_session.session_key != current_key:
#             await sync_to_async(logout, thread_sensitive=True)(request)
#
#     def _get_user_session(self, user):
#         try:
#             return UserSession.objects.get(user=user)
#         except UserSession.DoesNotExist:
#             return None
#
#     def _get_token_from_header(self, request):
#         auth = get_authorization_header(request).split()
#         if not auth or len(auth) != 2:
#             return None
#         try:
#             return auth[1].decode()
#         except Exception:
#             return None