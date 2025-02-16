#!/bin/sh

if [ "$DATABASE_NAME" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py makemigrations
# python manage.py flush --no-input
python manage.py migrate

python manage.py runserver 0.0.0.0:8000