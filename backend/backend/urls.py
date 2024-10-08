"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from company.views import settings_view
from order.views import create_view, update_view, confirm_view, create_checkout_session, get_order_info_view
from product.views import show_cars_view, company_vehicles_info, get_vehicle, get_vehicles_by_ids, \
    ProductDetail, ProductList


urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/company/settings/', settings_view),
    path('v1/order/create/', create_view),
    path('v1/order/update/<int:order_id>/', update_view),
    path('v1/order/confirm/<int:order_id>/', confirm_view),
    path('v1/order/info/<int:order_id>/', get_order_info_view),
    path('v1/order/create_checkout_session/', create_checkout_session),
    path('v1/booking/search/', show_cars_view),
    path('v1/vehicle/index/', company_vehicles_info),
    path('v1/vehicle/index/<str:ids>/', get_vehicles_by_ids),
    path('v1/product/get_vehicle/<int:external_id>/', get_vehicle),
    path('v1/products/<slug:slug>/', ProductDetail.as_view()),
    path('v1/products/', ProductList.as_view()),
    path('v1/communication/', include('communication.urls')),
]

urlpatterns += [path("ckeditor5/", include('django_ckeditor_5.urls'))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
