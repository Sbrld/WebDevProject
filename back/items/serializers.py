from rest_framework import serializers
from.models import Item
class ItemSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source = 'owner.username')

    class Meta:
        model = Item
        fields = [
            'id', 'owner', 'owner_username', 'title', 'description',
            'category', 'status', 'location', 'date', 'image',
            'is_active',  'created_at'
        ]
        read_only_fields = ['owner', 'created_at']