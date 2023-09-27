from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.api_request import ApiRequest
from product.models import Product


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
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/vehicle/index').get()
    products_dict = {}
    for prod in Product.objects.all():
        products_dict[prod.external_id] = {'priority': prod.priority}
    products_remote_list = []
    for prod_remote in r.json():
        if prod_remote['id'] in products_dict:
            priority = products_dict[prod_remote['id']]['priority']
        else:
            priority = 0
        prod_remote['priority'] = priority
        products_remote_list.append(prod_remote)

    products_remote_list.sort(key=lambda item: item['priority'], reverse=True)

    return Response(data=products_remote_list, status=r.status_code)
