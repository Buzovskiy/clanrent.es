import stripe
import json
from django.template.loader import render_to_string
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db.models import Sum
from backend.api_request import ApiRequestFileStorage


class Command(BaseCommand):

    def handle(self, *args, **options):
        path = settings.BASE_DIR / 'dumps/rentsyst'
        path.mkdir(parents=True, exist_ok=True)
        # Save general information
        r = ApiRequestFileStorage(url='https://api.rentsyst.com/v1/company/settings').get()
        with open(settings.BASE_DIR / 'dumps/rentsyst/settings.txt', 'w+', encoding='utf-8') as f:
            f.write(r.text)

        # Save information about cars
        r = ApiRequestFileStorage(url='https://api.rentsyst.com/v1/vehicle/index').get()
        with open(settings.BASE_DIR / 'dumps/rentsyst/vehicles_info.txt', 'w+', encoding='utf-8') as f:
            f.write(r.text)

        # Save the list of cars depending on rental days
        query = 'https://api.rentsyst.com/v1/booking/search?'
        query += 'pickup_location=C. Obispo Rafael Torija, 13005 Ciudad Real, Испания'
        query += '&return_location=C. Obispo Rafael Torija, 13005 Ciudad Real, Испания'
        query += '&dates=2024-12-17 00:00 - 2024-12-21 23:00'
        r = ApiRequestFileStorage(url=query).get()
        with open(settings.BASE_DIR / 'dumps/rentsyst/booking_search.txt', 'w+', encoding='utf-8') as f:
            f.write(r.text)

        with open(settings.BASE_DIR / 'dumps/rentsyst/booking_search.txt', 'r', encoding='utf-8') as f:
            content = json.load(f)
        print(content)
