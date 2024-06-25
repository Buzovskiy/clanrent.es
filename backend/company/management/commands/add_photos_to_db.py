import stripe
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
from product.models import Product


class Command(BaseCommand):

    def handle(self, *args, **options):
        for product in Product.objects.all():
            path = settings.BASE_DIR / 'dumps/rentsyst/images' / product.external_id
            original_filename = None
            for (dirpath, dirnames, filenames) in os.walk(path / 'thumbnail'):
                if not len(filenames):
                    break
                original_filename = filenames[0]
                break
            if original_filename is None:
                continue

            # Save original image
            with open(path / 'thumbnail' / original_filename, 'rb') as original_img:
                with ContentFile(original_img.read()) as new_image:
                    product.image_original.save(original_filename, new_image)
                    product.save()  # Save object

            thumbnail_filename = 'vehicle_thumbnail_' + original_filename.split('_')[-1]
            if not os.path.isfile(path / 'thumbnails' / thumbnail_filename):
                continue

            # Save thumbnail image
            with open(path / 'thumbnails' / thumbnail_filename, 'rb') as original_img:
                with ContentFile(original_img.read()) as new_image:
                    product.image_thumbnail.save(thumbnail_filename, new_image)
                    product.save()  # Save object
