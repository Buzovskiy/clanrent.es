# Generated by Django 4.2.3 on 2023-09-27 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_product_priority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='external_id',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Rentsyst id'),
        ),
    ]