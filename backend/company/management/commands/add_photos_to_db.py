import requests
import json
import os
from urllib.request import urlretrieve
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.db.models import Sum
from backend.api_request import ApiRequestFileStorage
from product.models import Product, ProductImage


class Command(BaseCommand):

    def handle(self, *args, **options):
        for product in Product.objects.all():
            path = settings.BASE_DIR / 'dumps/rentsyst/images' / product.external_id

            for (dirpath, dirnames, filenames) in os.walk(path / 'photos'):
                if not len(filenames):
                    break
                for filename in filenames:
                    with open(path / 'photos' / filename, 'rb') as original_img:
                        with ContentFile(original_img.read()) as new_image:
                            product_image = ProductImage()
                            product_image.product = product
                            product_image.original.save(filename, new_image)
                            first_product_image = ProductImage.objects.filter(product=product).\
                                order_by('-display_order').first()
                            if first_product_image:
                                max_display_order = first_product_image.display_order + 1
                            else:
                                max_display_order = 1
                            product_image.display_order = max_display_order
                            product_image.save()
