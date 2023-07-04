import requests
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from backend import api_request


client_id = r'F4mz6BU0qFtsm2bTd8ZVKWNMHuXNnEvd'
client_secret = r'K3DbjLsRp9OXWQhcKUXbNXDGRgIhVVlV'

access_token = r'3bc3cc726892d535fc06aed5e36c3c762f5ac9e9'


class SettingsView(View):
    """v1/company/settings/"""

    def get(self, request):

        headers = {'Authorization': f'Bearer {access_token}'}
        r = api_request.get(request, url='https://api.rentsyst.com/v1/company/settings')



        # data = {
        #     'vehicle_id': r'31025',
        #     'dates': r'2023-07-28 12:00 - 2023-07-30 12:00',
        #     'pickup_location': '7151',
        #     'return_location': '7151',
        # }
        # r = requests.post('https://api.rentsyst.com/v1/order/create', data=data, headers=headers)

        # return HttpResponse(api_request.get())
        return JsonResponse(r.json())
