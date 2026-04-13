from django.db import models
from django.conf import settings


class ItemManager(models.Manager):
    def active_found_items(self):
        return self.filter(status='found', is_active=True)

    def active_lost_items(self):
        return self.filter(status='lost', is_active=True)


class Item(models.Model):
    STATUS_CHOICES = [
        ('lost', 'Lost'),
        ('found', 'Found'),
        ('claimed', 'Claimed'),
        ('returned', 'Returned'),
    ]
    CATEGORY_CHOICES = [
        ('phone', 'Phone'),
        ('keys', 'Keys'),
        ('documents', 'Documents'),
        ('backpack', 'Backpack'),
        ('clothes', 'Clothes'),
        ('other', 'Other'),
    ]

    owner       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='items')
    title       = models.CharField(max_length=200)
    description = models.TextField()
    category    = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='lost')
    location    = models.CharField(max_length=255)
    date        = models.DateField()
    image       = models.ImageField(upload_to='items/', blank=True, null=True)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    objects = ItemManager()

    def __str__(self):
        return f"{self.title} [{self.status}]"