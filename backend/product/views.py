from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.api_request import ApiRequest


@api_view(['GET'])
def show_cars_view(request):
    """v1/booking/search/"""
    params = {
        'dates': request.query_params.get('dates'),
        'pickup_location': request.query_params.get('pickup_location'),
        'return_location': request.query_params.get('return_location'),
    }
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/booking/search', params=params).get()
    return Response(data=r.json(), status=r.status_code)


@api_view(['GET'])
def company_vehicles_info(request):
    """v1/vehicle/index/"""
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/vehicle/index').get()
    return Response(data=r.json(), status=r.status_code)
