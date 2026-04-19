from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Claim, Message
from .serializers import ClaimSerializer, MessageSerializer


class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all().order_by('-created_at')
    serializer_class = ClaimSerializer

    def perform_create(self, serializer):
        # No auth yet — auto-assign to a default dev user
        user, _ = User.objects.get_or_create(username='default_user')
        serializer.save(reported_by=user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('created_at')
    serializer_class = MessageSerializer
