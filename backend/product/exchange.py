import re
from django.db import IntegrityError
from django.db.models import Max
from django.utils.translation import gettext_lazy as _

from .models import Product
from backend.api_request import ApiRequest


def product_exchange(request):
    try:
        result = ApiRequest(request, url='https://api.rentsyst.com/v1/vehicle/index').get()
        objects_added = 0
        for car in result.json():
            thumbnail_small = get_thumbnail_small(
                external_id=car['id'],
                thumbnails_list=car['thumbnails'],
                thumbnail=car['thumbnail']
            )
            defaults = {
                "external_id": car['id'],
                "brand": car['brand'],
                "mark": car['mark'],
                "group": car['group'],
                "thumbnail": car['thumbnail'],
                "thumbnail_small": thumbnail_small,
                'currency': car['currency'],
                'year': car['year'],
                'price': car['price'],
                'transmission': car['transmission']
            }

            obj, created = Product.objects.update_or_create(
                external_id=car['id'],
                defaults=defaults
            )
            if created:
                priority_max = Product.objects.aggregate(Max('priority'))['priority__max']
                obj.priority = priority_max + 1
                obj.save()
                objects_added += 1
        return {'success': f'{objects_added} {_("objects added")}'}
    except IntegrityError as e:
        return {'error': e}


def get_thumbnail_small(external_id, thumbnails_list, thumbnail):
    pattern = re.compile(r'.*/vehicle_list_(\d+)')
    match = pattern.match(thumbnail)
    thumbnail_id = match.group(1)
    for thumbnail in thumbnails_list:
        if thumbnail.find(f'/static/cache/vehicle/{external_id}/vehicle_thumbnail_{thumbnail_id}') > -1:
            return thumbnail
    return ''
