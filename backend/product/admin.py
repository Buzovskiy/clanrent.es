from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.db import IntegrityError

from .models import Product
from django.urls import path


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # change_list_template = "product/product_changelist.html"
    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser:
            return self.readonly_fields
        return [field.name for field in self.opts.local_fields]

    actions = ["update_cars"]

    @admin.action(description="Make request to rentsyst and update cars list")
    def update_cars(self, request, queryset):
        # queryset.update(status="p")
        print('update cars')

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('get_cars_from_rentsyst/', self.get_cars_from_rentsyst),
        ]
        return my_urls + urls

    def get_cars_from_rentsyst(self, request):
        # self.model.objects.all().update(is_immortal=True)
        # self.message_user(request, "All heroes are now immortal")
        obj = Product(external_id='1', brand='4', mark='2', group='3')
        try:
            obj.save()
        except IntegrityError as e:
            print(e)
            messages.error(request, e)
        return HttpResponseRedirect("../")
