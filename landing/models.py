from django.db import models
from django.db.models.signals import pre_save
from lera.utils import (
    unique_id_generator
)
from lera.helpers import BaseModel, split_name
from pgcrypto.fields import EncryptedEmailField


class ContactUs(BaseModel):
    full_name = models.CharField(max_length=30, null=True, blank=True)
    email = EncryptedEmailField(null=True, blank=True)
    subject = models.CharField(max_length=100, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.full_name


def pre_save_contact_us(instance, *args, **kwargs):
    if not instance.uid:
        instance.uid = unique_id_generator(instance)


pre_save.connect(pre_save_contact_us, sender=ContactUs)