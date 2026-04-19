import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css'
})
export class ItemDetail implements OnInit {
  item: Item | null = null;
  errorMessage = '';
  loading = false;
  isEditing = false;

  editData = {
    title: '',
    description: '',
    category: '',
    status: '',
    location: '',
    date: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadItem(id);
  }

  loadItem(id: number) {
    this.loading = true;
    this.itemService.getItem(id).subscribe({
      next: (data) => {
        this.item = data;
        this.editData = {
          title: data.title,
          description: data.description,
          category: data.category,
          status: data.status,
          location: data.location,
          date: data.date
        };
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Item not found.';
        this.loading = false;
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveEdit() {
    if (!this.item?.id) return;
    const data = new FormData();
    data.append('title', this.editData.title);
    data.append('description', this.editData.description);
    data.append('category', this.editData.category);
    data.append('status', this.editData.status);
    data.append('location', this.editData.location);
    data.append('date', this.editData.date);

    this.itemService.updateItem(this.item.id, data).subscribe({
      next: (updated) => {
        this.item = updated;
        this.isEditing = false;
      },
      error: () => {
        this.errorMessage = 'Failed to update item.';
      }
    });
  }

  deleteItem() {
    if (!this.item?.id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    this.itemService.deleteItem(this.item.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Failed to delete item.';
      }
    });
  }
}
