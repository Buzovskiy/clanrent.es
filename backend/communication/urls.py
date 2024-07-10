from django.urls import path

from .views import request_callback


urlpatterns = [
    path('request-callback/', request_callback),
]
