from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.api_request import ApiRequest


@api_view(['GET'])
def settings_view(request):
    """v1/company/settings/"""
    r = ApiRequest(request, url='https://api.rentsyst.com/v1/company/settings').get()
    return Response(data=r.json(), status=r.status_code)
