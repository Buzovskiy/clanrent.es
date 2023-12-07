from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.api_request import ApiRequest
from product.models import Product
from product.serializers import ProductSerializer


@api_view(['GET'])
def show_cars_view(request):
    """v1/booking/search/"""
    params = {
        'dates': request.query_params.get('dates'),
        'pickup_location': request.query_params.get('pickup_location'),
        'return_location': request.query_params.get('return_location'),
    }
    if request.query_params.get('page') is not None:
        params['page'] = request.query_params.get('page')

    r = ApiRequest(request, url='https://api.rentsyst.com/v1/booking/search', params=params).get()
    return Response(data=r.json(), status=r.status_code)


@api_view(['GET'])
def company_vehicles_info(request):
    """v1/vehicle/index/"""
    products = Product.objects.filter(active=True).all()

    serializer = ProductSerializer(products, many=True)

    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def get_vehicles_by_ids(request, ids):
    """v1/vehicle/get-vehicles-by-ids/<str:ids>"""
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/vehicle/index').get()
    ids_list = [vehicle_id.strip() for vehicle_id in ids.split(',')]
    ids_list = [int(vehicle_id) for vehicle_id in ids_list]
    products = []
    for prod_remote in r.json():
        if int(prod_remote['id']) in ids_list:
            products.append(prod_remote)
    return Response(data=products, status=r.status_code)


@api_view(['GET'])
def get_vehicle(request, external_id):
    """v1/product/get_vehicle/<int:external_id>"""
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/vehicle/index').get()
    vehicle = {}
    for item in r.json():
        if int(item['id']) == external_id:
            vehicle = item
            break
    if bool(vehicle):
        return Response(data=vehicle, status=status.HTTP_200_OK)
    return Response(data={}, status=status.HTTP_404_NOT_FOUND)
