import requests
from django.conf import settings


class ApiRequest:
    def __init__(self, request, *args, **kwargs):
        self.request = request
        self.kwargs = kwargs
        self.args = args
        self.access_token = request.session.get('rentsyst_access_token')
        self.headers = {'Authorization': f'Bearer {self.access_token}'}
        if 'headers' in self.kwargs:
            self.headers.update(kwargs['headers'])
            self.kwargs.pop('headers')

    def get(self):
        result = requests.get(*self.args, **self.kwargs, headers=self.headers)
        if result.status_code == 401:
            # If not authorized make new request with refreshed token
            self.headers.update({'Authorization': f'Bearer {refresh_token(self.request)}'})
            result = requests.get(*self.args, **self.kwargs, headers=self.headers)
        return result

    def post(self):
        result = requests.post(*self.args, **self.kwargs, headers=self.headers)
        if result.status_code == 401:
            # If not authorized make new request with refreshed token
            self.headers.update({'Authorization': f'Bearer {refresh_token(self.request)}'})
            result = requests.post(*self.args, **self.kwargs, headers=self.headers)
        return result





# def post(request, *args, **kwargs):
#     access_token = request.session.get('rentsyst_access_token')
#     headers = {'Authorization': f'Bearer {access_token}'}
#     if 'headers' in kwargs:
#         headers.update(kwargs['headers'])
#         kwargs.pop('headers')
#     result = requests.post(*args, **kwargs, headers=headers)
#     if result.status_code == 401:
#         # If not authorized make new request with refreshed token
#         headers.update({'Authorization': f'Bearer {refresh_token(request)}'})
#         result = requests.post(*args, **kwargs, headers=headers)
#     return result


credentials = {
    'client_id': settings.RENTSYST_CLIENT_ID,
    'client_secret': settings.RENTSYST_CLIENT_SECRET,
    'grant_type': 'client_credentials',
}


def refresh_token(request):
    """
    Make request for new token, save it in session and return.
    If the request is unsuccessful the function will return old token
    :param request: Django request object
    :return: (string) token
    """
    token_request = requests.post('https://api.rentsyst.com/oauth2/token', data=credentials)
    if token_request.status_code == 200:
        access_token_new = token_request.json()['access_token']
        request.session['rentsyst_access_token'] = access_token_new
    return str(request.session.get('rentsyst_access_token'))
