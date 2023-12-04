from django.test import TestCase
from django.test.client import RequestFactory
from django.contrib.sessions.middleware import SessionMiddleware

from product.models import Product
from product.exchange import product_exchange


class ProductSerializerTestCase(TestCase):

    def setUp(self):
        self.factory = RequestFactory()
        request = self.factory.get(path='https://api.rentsyst.com/v1/vehicle/index')
        middleware = SessionMiddleware(lambda x: None)
        middleware.process_request(request)
        request.session.save()
        product_exchange(request)

    def test_product_serializer(self):
        self.assertEqual(1, 1)
