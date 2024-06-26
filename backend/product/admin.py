from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path
from django.utils.html import mark_safe
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
    readonly_fields = ('image_original_preview', 'image_thumbnail_preview')
    list_per_page = 20

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

    @admin.display(description='Image original')
    def image_original_preview(self, obj):
        if obj.image_original:
            return mark_safe('<img src="{url}" height="200px" />'.format(url=obj.image_original.url))
        return ""

    @admin.display(description='Image thumbnail')
    def image_thumbnail_preview(self, obj):
        if obj.image_thumbnail:
            return mark_safe('<img src="{url}" height="200px" />'.format(url=obj.image_thumbnail.url))
        return ""
