from django.db import models
from django.conf import settings
from django.dispatch import receiver
from backend.utils import post_delete_image, pre_save_image
from django.db.models.signals import post_delete, pre_save


class Product(models.Model):
    external_id = models.CharField('Rentsyst id', max_length=255, null=True, blank=True, unique=True)
    brand = models.CharField('Brand', max_length=255, null=True, blank=True)
    mark = models.CharField('Mark', max_length=255, null=True, blank=True)
    group = models.CharField('Group', max_length=255, null=True, blank=True)
    priority = models.PositiveIntegerField('Priority', null=False, blank=False, db_index=True, default=0)
    image_original = models.ImageField(
        'Original image', null=True, blank=True, upload_to='products/original/%Y/%m/%d')
    image_thumbnail = models.ImageField(
        'Thumbnail image', null=True, blank=True, upload_to='products/thumbnails/%Y/%m/%d')
    currency = models.CharField('Currency', max_length=255, null=True, blank=True)
    year = models.IntegerField('Year', null=True, blank=True)
    price = models.FloatField('Price', null=True, blank=True)
    transmission = models.CharField('Transmission', null=True, blank=True)
    active = models.BooleanField('Active', null=False, blank=False, default=True)

    objects = models.Manager()

    def get_absolute_image_url(self, image_field):
        url = getattr(self, image_field).url
        try:
            return "{0}{1}".format(settings.BASE_URL, url)
        except ValueError:
            return ''

    def __str__(self):
        return f'{self.brand} {self.mark} - {self.external_id}'

    class Meta:
        ordering = ['-priority']


@receiver(post_delete, sender=Product)
def delete_image_original(sender, instance, *args, **kwargs):
    post_delete_image(sender, instance, field_name='image_original', *args, **kwargs)


@receiver(pre_save, sender=Product)
def save_image_original(sender, instance, *args, **kwargs):
    pre_save_image(sender, instance, field_name='image_original', *args, **kwargs)


@receiver(post_delete, sender=Product)
def delete_image_thumbnail(sender, instance, *args, **kwargs):
    post_delete_image(sender, instance, field_name='image_thumbnail', *args, **kwargs)


@receiver(pre_save, sender=Product)
def save_image_thumbnail(sender, instance, *args, **kwargs):
    pre_save_image(sender, instance, field_name='image_thumbnail', *args, **kwargs)