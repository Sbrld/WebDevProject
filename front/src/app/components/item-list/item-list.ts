import { LucideAngularModule, Search, X, MapPin, Calendar, Package, Phone, Key, FileText, Backpack, Shirt } from 'lucide-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink, FormsModule, LucideAngularModule],
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
  pageTitle = 'All items';
  pageDescription = 'Browse every published lost-and-found listing in one place.';

  private readonly routeStatusMap: Record<string, string> = {
    found: 'found',
    lost: 'lost',
  };

  private readonly statusLabels: Record<string, string> = {
    lost: 'Lost',
    found: 'Found',
    claimed: 'Claimed',
    returned: 'Returned',
  };

  private readonly categoryLabels: Record<string, string> = {
    phone: 'Phone',
    keys: 'Keys',
    documents: 'Documents',
    backpack: 'Backpack',
    clothes: 'Clothes',
    other: 'Other',
  };

  filters = {
    category: '',
    status: '',
    location: ''
  };

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      const path = segments[0]?.path ?? 'items';
      const routeStatus = this.routeStatusMap[path] ?? '';

      this.filters = {
        ...this.filters,
        status: routeStatus,
      };

      if (path === 'found') {
        this.pageTitle = 'Found items';
        this.pageDescription = 'Review recovered belongings and help owners identify them quickly.';
      } else if (path === 'lost') {
        this.pageTitle = 'Lost items';
        this.pageDescription = 'Focus on active loss reports and check whether you have seen a match.';
      } else {
        this.pageTitle = 'All items';
        this.pageDescription = 'Browse every published lost-and-found listing in one place.';
      }

      this.loadItems();
    });
  }

  loadItems() {
    this.loading = true;
    this.errorMessage = '';
    this.itemService.getItems(this.filters).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load items. Please try again.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.loadItems();
  }

  clearFilters() {
    const path = this.route.snapshot.url[0]?.path ?? 'items';
    this.filters = {
      category: '',
      status: this.routeStatusMap[path] ?? '',
      location: ''
    };
    this.loadItems();
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status] ?? status;
  }

  getCategoryLabel(category: string): string {
    return this.categoryLabels[category] ?? category;
  }
}
