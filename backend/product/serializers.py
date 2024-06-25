from .models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    image_thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('external_id', 'brand', 'mark', 'group',
                  'priority', 'image_original', 'image_thumbnail',
                  'currency', 'year', 'price', 'transmission',
                  'active', 'image_thumbnail_url')

    def get_image_thumbnail_url(self, obj):
        return obj.get_absolute_image_url('image_thumbnail')
