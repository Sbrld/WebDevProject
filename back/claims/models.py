from django.db import models
from django.contrib.auth.models import User


class Claim(models.Model):
    class Status(models.TextChoices):
        LOST = 'lost', 'Lost'
        FOUND = 'found', 'Found'
        CLAIMED = 'claimed', 'Claimed'
        RETURNED = 'returned', 'Returned'

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)
    date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.LOST,
    )
    reported_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='claims',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} [{self.get_status_display()}]'


class Message(models.Model):
    claim = models.ForeignKey(
        Claim,
        on_delete=models.CASCADE,
        related_name='messages',
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages',
    )
    recipient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages',
    )
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'Message from {self.sender} to {self.recipient} re: {self.claim}'
