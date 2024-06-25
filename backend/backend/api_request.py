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


class AccessTokenFileStorage:
    path = settings.BASE_DIR / 'dumps/rentsyst/access_token.txt'

    def get(self):
        try:
            with open(self.path, 'r') as f:
                access_token = f.read()
        except FileNotFoundError:
            access_token = ''
        return access_token.strip()

    def write(self, access_token):
        with open(self.path, 'w+') as f:
            f.write(access_token)

    def refresh(self):
        """
        Make request for new token, save it in session and return.
        If the request is unsuccessful the function will return old token
        :return: (string) token
        """
        token_request = requests.post('https://api.rentsyst.com/oauth2/token', data=credentials)
        if token_request.status_code == 200:
            access_token_new = token_request.json()['access_token']
            self.write(access_token_new)
        return self.get()


class ApiRequestFileStorage:
    def __init__(self, *args, **kwargs):
        self.access_token_storage = AccessTokenFileStorage()
        self.kwargs = kwargs
        self.args = args
        self.headers = {'Authorization': f'Bearer {self.access_token_storage.get()}'}
        if 'headers' in self.kwargs:
            self.headers.update(kwargs['headers'])
            self.kwargs.pop('headers')

    def get(self):
        result = requests.get(*self.args, **self.kwargs, headers=self.headers)
        if result.status_code == 401:
            # If not authorized make new request with refreshed token
            self.headers.update({'Authorization': f'Bearer {self.access_token_storage.refresh()}'})
            result = requests.get(*self.args, **self.kwargs, headers=self.headers)
        return result
