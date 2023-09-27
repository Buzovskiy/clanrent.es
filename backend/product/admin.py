from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.db.models import Max
from django.urls import path
from django.utils.translation import gettext_lazy as _
from adminsortable2.admin import SortableAdminMixin

from .models import Product
from backend.api_request import ApiRequest


@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('external_id', 'brand_and_mark', 'group', 'priority', 'priority_num')

    def priority_num(self, obj):
        return obj.priority

    def brand_and_mark(self, obj):
        return f'{obj.brand} {obj.mark}'

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('get_cars_from_rentsyst/', self.get_cars_from_rentsyst),
        ]
        return my_urls + urls

    def get_cars_from_rentsyst(self, request):
        try:
            result = ApiRequest(request, url='https://api.rentsyst.com/v1/vehicle/index').get()
            objects_added = 0
            for car in result.json():
                obj, created = Product.objects.update_or_create(
                    external_id=car['id'],
                    defaults={
                        "external_id": car['id'],
                        "brand": car['brand'],
                        "mark": car['mark'],
                        "group": car['group']
                    }
                )
                if created:
                    priority_max = Product.objects.aggregate(Max('priority'))['priority__max']
                    obj.priority = priority_max + 1
                    obj.save()
                    objects_added += 1
            messages.success(request, f'{objects_added} {_("objects added")}')
        except IntegrityError as e:
            print(e)
            messages.error(request, e)
        return HttpResponseRedirect("../")
