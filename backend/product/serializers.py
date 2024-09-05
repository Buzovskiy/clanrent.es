from .models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    imageThumbnailUrl = serializers.SerializerMethodField('get_image_thumbnail_url')
    image_thumbnail_url = serializers.SerializerMethodField('get_image_thumbnail_url')
    externalId = serializers.CharField(source='external_id')

    class Meta:
        model = Product
        fields = ('externalId', 'brand', 'mark', 'group',
                  'priority',
                  'currency', 'year', 'price', 'transmission',
                  'active', 'imageThumbnailUrl', 'image_thumbnail_url')

    def get_image_thumbnail_url(self, obj):
        return obj.get_absolute_image_url('image_thumbnail')
