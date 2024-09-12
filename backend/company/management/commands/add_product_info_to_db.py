import json
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from product.models import Product, ProductOption


class Command(BaseCommand):

    def handle(self, *args, **options):
        source = settings.BASE_DIR / 'dumps/rentsyst/vehicles_info.txt'
        with open(source, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for car in data:
                try:
                    product = Product.objects.filter(external_id=car['id']).get()
                    product.year = car['year']
                    product.number_seats = car['number_seats']
                    product.number_doors = car['number_doors']
                    product.large_bags = car['large_bags']
                    product.odometer = car['odometer']
                    product.brand = car['brand']
                    product.mark = car['mark']
                    product.group = car['group']
                    product.color = car['color']['title']
                    product.color_code = car['color']['code']
                    product.type = car['type']
                    product.body_type = car['body_type']
                    product.consumption = car['consumption']
                    product.fuel = car['fuel']
                    product.volume_tank = car['volume_tank']
                    product.volume_engine = car['volume_engine']
                    product.transmission = car['transmission']
                    product.save()

                    for option in car['options'][0]:
                        ProductOption.objects.update_or_create(
                            product=product,
                            option=option['name'],
                        )
                except ObjectDoesNotExist:
                    continue
