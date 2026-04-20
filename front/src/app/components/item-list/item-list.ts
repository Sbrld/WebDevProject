import { LucideAngularModule, Search, X, MapPin, Calendar, Package, Phone, Key, FileText, Backpack, Shirt } from 'lucide-angular';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, FormsModule,LucideAngularModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {
  readonly Search = Search;
  readonly X = X;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly Package = Package;
  readonly Phone = Phone;
  readonly Key = Key;
  readonly FileText = FileText;
  readonly Backpack = Backpack;
  readonly Shirt = Shirt;
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
        console.log('Items received:', data);
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error:', err);
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
