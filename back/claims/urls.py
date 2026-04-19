from rest_framework.routers import DefaultRouter
from .views import ClaimViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'claims', ClaimViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = router.urls
