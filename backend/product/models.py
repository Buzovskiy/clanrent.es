from django.db import models


class Product(models.Model):
    external_id = models.CharField('Rentsyst id', max_length=255, null=True, blank=True)
    brand = models.CharField('Brand', max_length=255, null=True, blank=True, unique=True)
    mark = models.CharField('Mark', max_length=255, null=True, blank=True)
    group = models.CharField('Group', max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.brand} {self.mark} - {self.external_id}'
