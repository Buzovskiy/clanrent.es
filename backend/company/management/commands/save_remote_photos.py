import stripe
import requests
import json
from urllib.request import urlretrieve
from django.template.loader import render_to_string
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db.models import Sum
from backend.api_request import ApiRequestFileStorage


class Command(BaseCommand):

    def handle(self, *args, **options):
        path = settings.BASE_DIR / 'dumps/rentsyst/images'
        path.mkdir(parents=True, exist_ok=True)
        # Save information about cars
        r = ApiRequestFileStorage(url='https://api.rentsyst.com/v1/vehicle/index').get()
        for car in r.json():
            car_path = path / car['id']
            car_path.mkdir(exist_ok=True)

            #Save thumbnail
            thumbnail_path = car_path / 'thumbnail'
            thumbnail_path.mkdir(exist_ok=True)
            url = car['thumbnail']
            r = requests.get(url)
            if r.status_code == 200:
                name = url.split('/')[-1]
                with open(thumbnail_path / name, 'wb') as outfile:
                    outfile.write(r.content)

            # Save thumbnails
            thumbnail_path = car_path / 'thumbnails'
            thumbnail_path.mkdir(exist_ok=True)
            for url in car['thumbnails']:
                r = requests.get(url)
                if r.status_code == 200:
                    name = url.split('/')[-1]
                    with open(thumbnail_path / name, 'wb') as outfile:
                        outfile.write(r.content)

            # Save thumbnails
            thumbnail_path = car_path / 'photos'
            thumbnail_path.mkdir(exist_ok=True)
            for url in car['photos']:
                r = requests.get(url)
                if r.status_code == 200:
                    name = url.split('/')[-1]
                    with open(thumbnail_path / name, 'wb') as outfile:
                        outfile.write(r.content)
