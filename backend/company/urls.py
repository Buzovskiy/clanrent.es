from django.urls import path

from . import views


urlpatterns = [
    path('settings/', views.SettingsView.as_view()),
]
