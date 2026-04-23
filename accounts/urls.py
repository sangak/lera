from django.urls import path
from .views import (
    LoginAuthenticationView, LogoutRequestView,
    AccountManagementView, AccountCreateView, AccountUpdateView
)

app_name = 'accounts'

urlpatterns = [
    path('create/', AccountCreateView.as_view(), name='create'),
    path('login/', LoginAuthenticationView.as_view(), name='login'),
    path('logout/', LogoutRequestView.as_view(), name='logout'),
    path('user-management/', AccountManagementView.as_view(), name='user-management'),
    path('update/<uid>/', AccountUpdateView.as_view(), name='update'),
]