from django.db import models


class Product(models.Model):
    external_id = models.CharField('Rentsyst id', max_length=255, null=True, blank=True, unique=True)
    brand = models.CharField('Brand', max_length=255, null=True, blank=True)
    mark = models.CharField('Mark', max_length=255, null=True, blank=True)
    group = models.CharField('Group', max_length=255, null=True, blank=True)
    priority = models.PositiveIntegerField('Priority', null=False, blank=False, db_index=True, default=0)
    thumbnail = models.CharField('Thumbnail', max_length=255, null=True, blank=True)
    thumbnail_small = models.CharField('Thumbnail_small', max_length=255, null=True, blank=True)
    currency = models.CharField('Currency', max_length=255, null=True, blank=True)
    year = models.IntegerField('Year', null=True, blank=True)
    price = models.FloatField('Price', null=True, blank=True)
    transmission = models.CharField('Transmission', null=True, blank=True)

    objects = models.Manager()

    def __str__(self):
        return f'{self.brand} {self.mark} - {self.external_id}'

    class Meta:
        ordering = ['-priority']
