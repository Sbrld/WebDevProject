from django.urls import path
from .views import ItemListCreateView, ItemDetailView, my_items, update_item_status

urlpatterns = [
    path('', ItemListCreateView.as_view(), name='item-list-create'),
    path('<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('my/', my_items, name='my-items'),
    path('<int:pk>/status/', update_item_status, name='update-item-status'),
]