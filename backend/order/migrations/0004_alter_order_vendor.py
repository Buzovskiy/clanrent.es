# Generated by Django 4.2.3 on 2024-03-05 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_alter_order_vendor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='vendor',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
