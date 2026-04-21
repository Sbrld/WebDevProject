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

class ItemCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Item
            fields = ['title', 'description', 'category', 'status', 'location', 'date', 'image']


class ItemFilterSerializer(serializers.Serializer):
    category = serializers.ChoiceField(choices=['phone', 'keys', 'documents', 'backpack', 'clothes', 'other'], required=False)
    status = serializers.ChoiceField(choices=['lost', 'found', 'claimed', 'returned'], required=False)
    location = serializers.CharField(max_length=255, required=False)
    date_from = serializers.DateField(required=False)
    date_to = serializers.DateField(required=False)

class ItemStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['lost', 'found', 'claimed', 'returned'])