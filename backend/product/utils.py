from django.test.client import RequestFactory
from django.contrib.sessions.middleware import SessionMiddleware

from product.exchange import product_exchange


def create_products_for_testing():
    factory = RequestFactory()
    request = factory.get(path='https://api.rentsyst.com/v1/vehicle/index')
    middleware = SessionMiddleware(lambda x: None)
    middleware.process_request(request)
    request.session.save()
    product_exchange(request)
