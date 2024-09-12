from django.db import models
from django.conf import settings
from django.dispatch import receiver
from backend.utils import post_delete_image, pre_save_image
from django.db.models.signals import post_delete, pre_save
from django.utils.translation import gettext_lazy as _
from slugify import slugify


class Product(models.Model):
    external_id = models.CharField('Rentsyst id', max_length=255, null=True, blank=True, unique=True)
    priority = models.PositiveIntegerField('Priority', null=False, blank=False, db_index=True, default=0)
    slug = models.SlugField('Slug', null=True, blank=True, unique=True)

    year = models.PositiveSmallIntegerField('Year', null=True, blank=True)
    number_seats = models.PositiveSmallIntegerField('Number seats', null=True, blank=True)
    number_doors = models.PositiveSmallIntegerField('Number doors', null=True, blank=True)
    large_bags = models.PositiveSmallIntegerField('Large bags', null=True, blank=True)
    odometer = models.IntegerField('Odometer', null=True, blank=True)
    brand = models.CharField('Brand', max_length=255, null=True, blank=True)
    mark = models.CharField('Mark', max_length=255, null=True, blank=True)
    group = models.CharField('Group', max_length=255, null=True, blank=True)
    color = models.CharField('Color', max_length=255, null=True, blank=True)
    color_code = models.CharField('Color code', max_length=255, null=True, blank=True)
    type = models.CharField('Type (car, motorcycle, truck)', max_length=255, null=True, blank=True)
    body_type = models.CharField('Body type (sedan, hatchback)', max_length=255, null=True, blank=True)
    price = models.FloatField('Price', null=True, blank=True)
    active = models.BooleanField('Active', null=False, blank=False, default=True)
    currency = models.CharField('Currency', max_length=255, null=True, blank=True)
    consumption = models.PositiveSmallIntegerField('Consumption', null=True, blank=True)
    fuel = models.CharField('Fuel', max_length=255, null=True, blank=True)
    volume_tank = models.PositiveSmallIntegerField('Volume tank', null=True, blank=True)
    volume_engine = models.FloatField('Volume engine', null=True, blank=True)
    transmission = models.CharField('Transmission', null=True, blank=True)

    objects = models.Manager()

    def save(self, *args, **kwargs):
        super(Product, self).save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(f'{self.brand}-{self.mark}-{self.year}-id-{self.id}')
            super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.brand} {self.mark} - {self.external_id}'

    class Meta:
        ordering = ['-priority']


class ProductImage(models.Model):
    """
    An image of a product
    """
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name=_("Product"))
    original = models.ImageField(
        _("Original"), upload_to='product_image/original/%Y/%m/%d', max_length=255, null=True, blank=True)
    #: Use display_order to determine which is the "primary" image
    display_order = models.PositiveIntegerField(
        _("Display order"), default=0, db_index=True, blank=False, null=False,
        help_text=_("An image with a display order of zero will be the primary"
                    " image for a product"))
    date_created = models.DateTimeField(_("Date created"), auto_now_add=True)

    def get_absolute_image_url(self, image_field):
        url = getattr(self, image_field).url
        try:
            return "{0}{1}".format(settings.BASE_URL, url)
        except ValueError:
            return ''

    @property
    def original_url(self):
        return self.get_absolute_image_url('original')

    class Meta:
        ordering = ["display_order"]
        verbose_name = _('Product image')
        verbose_name_plural = _('Product images')

    def __str__(self):
        return "Image of '%s'" % self.product


class ProductOption(models.Model):
    product = models.ForeignKey('Product', related_name='options', on_delete=models.CASCADE)
    option = models.CharField('Option', max_length=255, null=False, blank=False)


@receiver(post_delete, sender=ProductImage)
def delete_product_image_original(sender, instance, *args, **kwargs):
    post_delete_image(sender, instance, field_name='original', *args, **kwargs)


@receiver(pre_save, sender=ProductImage)
def save_product_image_original(sender, instance, *args, **kwargs):
    pre_save_image(sender, instance, field_name='original', *args, **kwargs)
