from django.test import TestCase, Client

from product.utils import create_products_for_testing


class ViewTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        create_products_for_testing()

    def test_company_vehicles_info(self):
        response = self.client.get('/v1/vehicle/index/')
        self.assertEqual(response.status_code, 200)
        if len(response.json()) > 0:
            self.assertTrue('thumbnail_small' in response.json()[0])
