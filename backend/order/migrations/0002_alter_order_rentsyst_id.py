# Generated by Django 4.2.3 on 2024-03-05 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='rentsyst_id',
            field=models.IntegerField(unique=True),
        ),
    ]
