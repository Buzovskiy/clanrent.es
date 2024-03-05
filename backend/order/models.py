from django.db import models


class Order(models.Model):
    rentsyst_id = models.IntegerField(unique=True)
    vendor = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.rentsyst_id} - {self.vendor}"
