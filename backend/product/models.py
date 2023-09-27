from django.db import models


class Product(models.Model):
    external_id = models.CharField('Rentsyst id', max_length=255, null=True, blank=True, unique=True)
    brand = models.CharField('Brand', max_length=255, null=True, blank=True)
    mark = models.CharField('Mark', max_length=255, null=True, blank=True)
    group = models.CharField('Group', max_length=255, null=True, blank=True)
    priority = models.PositiveIntegerField('Priority', null=False, blank=False, db_index=True, default=0)

    objects = models.Manager()

    def __str__(self):
        return f'{self.brand} {self.mark} - {self.external_id}'

    class Meta:
        ordering = ['-priority']
