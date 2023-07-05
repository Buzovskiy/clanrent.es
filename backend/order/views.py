from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.api_request import ApiRequest


@api_view(['POST'])
def create_view(request):
    """v1/order/create/"""
    data = request.data
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/order/create', data=data).post()
    return Response(data=r.json(), status=r.status_code)


# data = {
#     'vehicle_id': r'31025',
#     'dates': r'2023-07-28 12:00 - 2023-07-30 12:00',
#     'pickup_location': '7151',
#     'return_location': '7151',
# }