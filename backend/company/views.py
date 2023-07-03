import requests
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse, JsonResponse


class SettingsView(View):

    def get(self, request):
        headers = {'Authorization': 'Bearer 3fc1039a268e86063637141ef493fe645bd667fe'}
        r = requests.get('https://api.rentsyst.com/v1/company/settings', headers=headers)
        return JsonResponse(r.json())
