### Delivery of changes

Command rebuilds the image for django service and then stops, destroys, 
and recreates just the django service. The --no-deps flag prevents Compose 
from also recreating any services which django depends on
```shell
sudo docker compose up -d --no-deps --build django
```
Start services
```shell
docker compose up -d
```
Remove services
```shell
docker compose down
```
Monitor the output of running containers and debug issues
```shell
docker compose logs
```
List all the services
```shell
docker compose ps
```
Execute a command in a running container corresponding to django service
```shell
sudo docker compose exec django sh
```