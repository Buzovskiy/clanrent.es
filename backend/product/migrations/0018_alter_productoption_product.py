# Generated by Django 5.1.1 on 2024-09-11 15:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0017_remove_product_image_original_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productoption',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='product.product'),
        ),
    ]