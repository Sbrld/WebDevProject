import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Package, MapPin, Calendar, Phone, Key, FileText, Backpack, Shirt, Plus } from 'lucide-angular';
import { ItemService } from '../../services/item';
import { Item } from '../../models/item';

@Component({
  selector: 'app-my-items',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './my-items.html',
  styleUrl: './my-items.css'
})
export class MyItems implements OnInit {
  readonly Package = Package;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly Phone = Phone;
  readonly Key = Key;
  readonly FileText = FileText;
  readonly Backpack = Backpack;
  readonly Shirt = Shirt;
  readonly Plus = Plus;

  items: Item[] = [];
  errorMessage = '';
  loading = false;

  constructor(private itemService: ItemService) {}

  ngOnInit() { this.loadMyItems(); }

  loadMyItems() {
    this.loading = true;
    this.errorMessage = '';
    this.itemService.getMyItems().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: () => { this.errorMessage = 'Failed to load your items. Make sure you are logged in.'; this.loading = false; }
    });
  }
}
