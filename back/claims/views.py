from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Claim, Message

User = get_user_model()
from .serializers import ClaimSerializer, MessageSerializer, UserSerializer


class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all().order_by('-created_at')
    serializer_class = ClaimSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.filter(is_active=True).order_by('username')
    serializer_class = UserSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.select_related('claim', 'sender', 'recipient').order_by('created_at')
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def thread(self, request):
        claim_id = request.query_params.get('claim')
        sender_id = request.query_params.get('sender')
        recipient_id = request.query_params.get('recipient')
        if not all([claim_id, sender_id, recipient_id]):
            return Response(
                {'error': 'claim, sender, and recipient are required'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        messages = (
            Message.objects.filter(
                claim_id=claim_id,
                sender_id=sender_id,
                recipient_id=recipient_id,
            )
            .select_related('sender', 'recipient')
            .order_by('created_at')
        )
        return Response(MessageSerializer(messages, many=True).data)

    @action(detail=False, methods=['get'])
    def conversations(self, request):
        user_id = request.user.id

        messages = (
            Message.objects.filter(Q(sender_id=user_id) | Q(recipient_id=user_id))
            .select_related('claim', 'sender', 'recipient')
            .order_by('created_at')
        )

        threads = {}
        for msg in messages:
            key = (msg.claim_id, msg.sender_id, msg.recipient_id)
            other = msg.recipient if msg.sender_id == user_id else msg.sender
            if key not in threads:
                threads[key] = {
                    'claim_id': msg.claim_id,
                    'claim_title': msg.claim.title,
                    'claim_status': msg.claim.status,
                    'sender_id': msg.sender_id,
                    'recipient_id': msg.recipient_id,
                    'other_user_id': other.id,
                    'other_user_name': other.get_full_name() or other.username,
                    'last_message': msg.content,
                    'last_message_at': msg.created_at.isoformat(),
                }
            else:
                threads[key]['last_message'] = msg.content
                threads[key]['last_message_at'] = msg.created_at.isoformat()

        return Response(list(threads.values()))
