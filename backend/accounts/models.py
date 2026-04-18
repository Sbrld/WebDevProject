from django.db import models
from django.contrib.auth.models import AbstarctUser
# Create your models here.

class User(AbstarctUser):
    bio = model.TextField(blank=True, null=True)
    phone = models.CharField(max_length=12, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

