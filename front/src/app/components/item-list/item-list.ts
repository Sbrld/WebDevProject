import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {
  items: Item[] = [];
  errorMessage = '';
  loading = false;

  filters = {
    category: '',
    status: '',
    location: ''
  };

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.errorMessage = '';
    this.itemService.getItems(this.filters).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load items. Please try again.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.loadItems();
  }

  clearFilters() {
    this.filters = { category: '', status: '', location: '' };
    this.loadItems();
  }
}
