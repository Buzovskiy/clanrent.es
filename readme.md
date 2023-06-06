##### rentsys.com getting auth token via curl:
```
curl --location 'https://api.rentsyst.com/oauth2/token' \
--form 'client_id="<client_id>"' \
--form 'client_secret="<client_secret>"' \
--form 'grant_type="client_credentials"'
```
answer:
```
{"access_token":"11111111111","expires_in":86400,"token_type":"Bearer","scope":null}
```
##### rentsys.com get company info
```
curl --location 'https://api.rentsyst.com/v1/company/settings' -H 'Authorization: Bearer access_token'
```
