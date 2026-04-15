from django.urls import path
from .views import ItemListCreateView, ItemDetailView, MyItemsView

urlpatterns = [
    path('', ItemListCreateView.as_view(), name = 'item-list-create'),
    path('<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('my/', MyItemsView.as_view(), name='my-items'),
]