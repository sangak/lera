from django.http import HttpResponse
from django.urls import path
from landing.views import (
    LandingPageView, ContactUsPageView,
    ProgramPageView, AboutUsPageView, VisionPageView, WebManifestPageView
)

app_name = 'landing'

urlpatterns = [
    path('', LandingPageView.as_view(), name='index'),
    path('about-us/', AboutUsPageView.as_view(), name='about'),
    path('contact-us/', ContactUsPageView.as_view(), name='contact'),
    path('program/', ProgramPageView.as_view(), name='program'),
    path('vision-mission/', VisionPageView.as_view(), name='vision-mission'),
    path('site.webmanifest/', WebManifestPageView.as_view(), name='webmanifest'),
    path('googleec0ab87b7b26f6c3.html/', lambda r: HttpResponse("google-site-verification: googleec0ab87b7b26f6c3.html",
                                                     content_type="text/html")),
]

