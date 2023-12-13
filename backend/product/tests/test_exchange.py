from django.test import SimpleTestCase
from product.exchange import get_thumbnail_small


class GetThumbnailSmallTestCase(SimpleTestCase):

    def test_get_thumbnail_small_test_case_1(self):
        thumbnails = [
            "https://rentsyst.com/static/cache/vehicle/34927/vehicle_thumbnail_52201.jpg",
            "https://rentsyst.com/static/cache/vehicle/34927/vehicle_thumbnail_52203.jpg",
            "https://rentsyst.com/static/cache/vehicle/34927/vehicle_thumbnail_52205.jpg",
            "https://rentsyst.com/static/cache/vehicle/34927/vehicle_thumbnail_52217.jpg"
        ]
        thumbnail_pattern = "https://rentsyst.com/static/cache/vehicle/34927/vehicle_list_52217.jpg"
        thumbnail_needle = get_thumbnail_small(34927, thumbnails, thumbnail_pattern)
        self.assertEqual(
            "https://rentsyst.com/static/cache/vehicle/34927/vehicle_thumbnail_52217.jpg",
            thumbnail_needle
        )

    def test_get_thumbnail_small_test_case_2(self):
        thumbnails = []
        thumbnail_pattern = "https://rentsyst.com/static/cache/vehicle/34927/vehicle_list_52217.jpg"
        thumbnail_needle = get_thumbnail_small(34927, thumbnails, thumbnail_pattern)
        self.assertEqual("", thumbnail_needle)
