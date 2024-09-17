from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path
from django.utils.html import mark_safe
from adminsortable2.admin import SortableAdminMixin, SortableTabularInline

from .exchange import product_exchange
from .models import Product, ProductImage, ProductOption, Price


def get_cars_from_rentsyst(request):
    message = product_exchange(request)
    if 'success' in message:
        messages.success(request, message['success'])
    if 'error' in message:
        messages.error(request, message['error'])

    return HttpResponseRedirect("../")


class ProductOptionInline(admin.TabularInline):
    model = ProductOption
    classes = ['collapse']
    extra = 0


class PriceInline(admin.TabularInline):
    model = Price
    extra = 0


class ProductImageInline(SortableTabularInline):
    model = ProductImage
    classes = ['collapse']
    readonly_fields = ('image_original_preview',)
    extra = 0

    @admin.display(description='Image original')
    def image_original_preview(self, obj):
        if obj.original:
            return mark_safe('<img src="{url}" height="50px" />'.format(url=obj.original.url))
        return ""


@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    inlines = [PriceInline, ProductImageInline, ProductOptionInline]
    list_display = ('external_id', 'brand_and_mark', 'group', 'priority', 'priority_num', 'active')
    readonly_fields = ('slug',)
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
