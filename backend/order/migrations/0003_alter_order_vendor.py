# Generated by Django 4.2.3 on 2024-03-05 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_alter_order_rentsyst_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='vendor',
            field=models.CharField(max_length=255, null=True),
        ),
    ]