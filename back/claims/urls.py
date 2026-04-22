from rest_framework.routers import DefaultRouter
from .views import ClaimViewSet, MessageViewSet, UserViewSet

router = DefaultRouter()
router.register(r'claims', ClaimViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls
