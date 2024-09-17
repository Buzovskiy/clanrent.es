from .models import Product, ProductImage, Price
from rest_framework import serializers


class PriceSerializer(serializers.ModelSerializer):
    daysMin = serializers.IntegerField(source='days_min')
    daysMax = serializers.IntegerField(source='days_max')

    class Meta:
        model = Price
        fields = ('id', 'price', 'daysMin', 'daysMax')


class ProductSerializer(serializers.ModelSerializer):
    # externalId = serializers.CharField(source='external_id')
    images = serializers.SlugRelatedField(slug_field='original_url', read_only=True, many=True)
    options = serializers.SlugRelatedField(slug_field='option', read_only=True, many=True)
    prices = PriceSerializer(many=True)

    class Meta:
        model = Product
        fields = ('id', 'slug', 'brand', 'mark', 'group',
                  'priority',
                  'currency', 'year', 'transmission',
                  'active', 'description', 'prices', 'images', 'options')
