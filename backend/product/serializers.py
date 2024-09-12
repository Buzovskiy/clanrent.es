from .models import Product, ProductImage
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    # externalId = serializers.CharField(source='external_id')
    images = serializers.SlugRelatedField(slug_field='original_url', read_only=True, many=True)
    options = serializers.SlugRelatedField(slug_field='option', read_only=True, many=True)

    class Meta:
        model = Product
        fields = ('id', 'slug', 'brand', 'mark', 'group',
                  'priority',
                  'currency', 'year', 'price', 'transmission',
                  'active', 'images', 'options')
