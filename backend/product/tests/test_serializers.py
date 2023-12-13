from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.sessions.middleware import SessionMiddleware

from product.models import Product
from product.serializers import ProductSerializer
from product.exchange import product_exchange

from product.utils import create_products_for_testing


class ProductSerializerTestCase(TestCase):

    def setUp(self):
        self.factory = RequestFactory()
        create_products_for_testing()

    def test_product_serializer(self):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(products.count(), len(serializer.data))
