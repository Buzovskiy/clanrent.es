# Generated by Django 4.2.3 on 2023-09-26 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Brand'),
        ),
    ]
