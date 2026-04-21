from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Claim, Message


class UserSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'display_name']

    def get_display_name(self, obj):
        return obj.get_full_name() or obj.username


class ClaimSerializer(serializers.ModelSerializer):
    reported_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Claim
        fields = [
            'id', 'title', 'description', 'category',
            'location', 'date', 'status', 'reported_by',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['reported_by', 'created_at', 'updated_at']


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    recipient_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            'id', 'claim', 'sender', 'sender_name',
            'recipient', 'recipient_name',
            'content', 'is_read', 'created_at',
        ]
        read_only_fields = ['created_at', 'sender_name', 'recipient_name']

    def get_sender_name(self, obj):
        return obj.sender.get_full_name() or obj.sender.username

    def get_recipient_name(self, obj):
        return obj.recipient.get_full_name() or obj.recipient.username
