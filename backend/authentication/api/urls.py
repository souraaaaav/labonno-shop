from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path("signup/user/", views.userSignupView.as_view()),
    path("email-verify/", views.VerifyEmail.as_view(), name='email-verify'),
    path("login/", views.customAuthToken.as_view()),
    path("logout/", views.LogoutView.as_view()),
    path("checkauth/", views.continuousVerificationView.as_view()),
    path('password-change-request/', views.passwordChangeRequestView.as_view()),
    path('password-change-confirm/', views.PasswordChangeConfirmView.as_view()),

    path('products/', views.ProductList.as_view(), name='product-list'),
    path('packages/', views.PackageList.as_view(), name='package-list'),
]

