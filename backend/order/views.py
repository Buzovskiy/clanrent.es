from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.api_request import ApiRequest


@api_view(['POST'])
def create_view(request):
    """v1/order/create/"""
    data = request.data.copy()
    # company = ApiRequest(request, url='https://api.rentsyst.com/v1/company/settings').get()
    # We don't pass the location data specified by user because they are not valid
    # We pass valid data
    # data['pickup_location'] = company.json()['locations'][0]['id']
    # data['return_location'] = company.json()['locations'][0]['id']
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/order/create', data=data).post()
    return Response(data=r.json(), status=r.status_code)


@api_view(['POST'])
def update_view(request, order_id=None):
    """v1/order/update/<int:order_id>"""
    data = request.data
    r = ApiRequest(request, url=f'https://api.rentsyst.com/v1/order/update/{order_id}', data=data).post()
    return Response(data=r.json(), status=r.status_code)


@api_view(['POST'])
def confirm_view(request, order_id=None):
    """v1/order/confirm/<int:order_id>"""
    data = request.data
    r = ApiRequest(request, url=f'https://api.rentsyst.com/v1/order/confirm/{order_id}', data=data).post()
    return Response(data=r.json(), status=r.status_code)


# data = {
#     'vehicle_id': r'31025',
#     'dates': r'2023-07-28 12:00 - 2023-07-30 12:00',
#     'pickup_location': '7151',
#     'return_location': '7151',
# }