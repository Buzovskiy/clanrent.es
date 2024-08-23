# Start your image with a node base image
FROM python:3.12.5-slim-bookworm

# The /app directory should act as the main application directory
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get -y install libpq-dev python3-dev
RUN apt-get -y install build-essential

# Copy the app package and package-lock.json file
COPY requirements.txt .


RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
#CMD ["gunicorn", "project.wsgi:application", "--bind", "0.0.0.0:8000"]