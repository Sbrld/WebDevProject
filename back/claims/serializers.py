from rest_framework import serializers
from .models import Claim, Message


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
    class Meta:
        model = Message
        fields = ['id', 'claim', 'sender', 'recipient', 'content', 'is_read', 'created_at']
        read_only_fields = ['created_at']
