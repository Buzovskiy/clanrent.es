# Generated by Django 4.2.3 on 2023-12-07 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0009_product_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='active',
            field=models.BooleanField(default=True, verbose_name='Active'),
        ),
    ]
