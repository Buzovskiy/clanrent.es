import requests


def get(request, *args, **kwargs):
    access_token = request.session.get('rentsyst_access_token')
    headers = {'Authorization': f'Bearer {access_token}'}
    if 'headers' in kwargs:
        headers.update(kwargs['headers'])
        kwargs.pop('headers')
    result = requests.get(*args, **kwargs, headers=headers)
    if result.status_code == 401:
        # If not authorized make new request with refreshed token
        headers.update({'Authorization': f'Bearer {refresh_token(request)}'})
        result = requests.get(*args, **kwargs, headers=headers)
    return result


data = {
    'client_id': 'ff',
    'client_secret': 'ddd',
    'grant_type': 'client_credentials',
}


def refresh_token(request):
    """
    Make request for new token, save it in session and return.
    If the request is unsuccessful the function will return old token
    :param request: Django request object
    :return: (string) token
    """
    token_request = requests.post('https://api.rentsyst.com/oauth2/token', data=data)
    if token_request.status_code == 200:
        access_token_new = token_request.json()['access_token']
        request.session['rentsyst_access_token'] = access_token_new
    return str(request.session.get('rentsyst_access_token'))
