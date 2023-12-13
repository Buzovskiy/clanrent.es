from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path
from adminsortable2.admin import SortableAdminMixin

from .exchange import product_exchange
from .models import Product


def get_cars_from_rentsyst(request):
    message = product_exchange(request)
    if 'success' in message:
        messages.success(request, message['success'])
    if 'error' in message:
        messages.error(request, message['error'])

    return HttpResponseRedirect("../")


@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('external_id', 'brand_and_mark', 'group', 'priority', 'priority_num', 'active')

    def priority_num(self, obj):
        return obj.priority

    def brand_and_mark(self, obj):
        return f'{obj.brand} {obj.mark}'

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('get_cars_from_rentsyst/', get_cars_from_rentsyst),
        ]
        return my_urls + urls
