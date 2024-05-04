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
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),
    path('products/<int:product_id>/comments/', views.ProductCommentList.as_view(), name='product_comment_list'),
    path('products/<int:product_id>/can-comment/', views.CanComment.as_view(), name='can_comment'),
    path('products/<int:product_id>/create-product-comment/', views.create_product_comment, name='create_product_comment'),
    
    path('products/<int:product_id>/can-rate/', views.CheckUserCanRate.as_view(), name='check_user_can_rate'),
    path('products/<int:product_id>/rate/', views.ProductRatingView.as_view(), name='product_rating'),
    path('products/<int:product_id>/get-rating/', views.GetProductRating.as_view(), name='get_product_rating'),

    path('packages/', views.PackageList.as_view(), name='package-list'),
    path('packages/<int:pk>/', views.PackageDetail.as_view(), name='package-detail'),

    path('create_order/', views.create_order, name='create_order'),
    path('create_package_order/', views.create_package_order, name='create_package_order'),

    path('orders/', views.UserOrderListView.as_view(), name='user_orders'),
    path('package-orders/', views.PackageOrderListAPIView.as_view(), name='package_order_list'),

    path('products-for-seller/', views.ProductViewSet.as_view(), name='product-list-for-seller'),
    path('create-product/', views.create_product, name='product-create'),
    path('update-product/', views.update_product, name='product-update'),


]

