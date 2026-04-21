import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MapPin, Calendar, User, Tag, ArrowLeft, Edit, Trash2, Save, X, Phone, Key, FileText, Backpack, Shirt, Package } from 'lucide-angular';
import { ItemService } from '../../services/item';
import { Item } from '../../models/item';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, LucideAngularModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css'
})
export class ItemDetail implements OnInit {
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly User = User;
  readonly Tag = Tag;
  readonly ArrowLeft = ArrowLeft;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Save = Save;
  readonly X = X;
  readonly Phone = Phone;
  readonly Key = Key;
  readonly FileText = FileText;
  readonly Backpack = Backpack;
  readonly Shirt = Shirt;
  readonly Package = Package;

  item: Item | null = null;
  errorMessage = '';
  loading = false;
  isEditing = false;

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

  editData = { title: '', description: '', category: '', status: '', location: '', date: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    public auth: AuthService
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
        this.editData = { title: data.title, description: data.description, category: data.category, status: data.status, location: data.location, date: data.date };
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
    Object.entries(this.editData).forEach(([k, v]) => data.append(k, v));
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
    if (!this.item?.id || !confirm('Are you sure?')) return;
    this.itemService.deleteItem(this.item.id).subscribe({
      next: () => this.router.navigate(['/my-items']),
      error: () => {
        this.errorMessage = 'Failed to delete item.';
      }
    });
  }

  canManageItem(): boolean {
    const currentUser = this.auth.currentUser();
    return !!currentUser && !!this.item && currentUser.id === this.item.owner;
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status] ?? status;
  }

  getCategoryLabel(category: string): string {
    return this.categoryLabels[category] ?? category;
  }
}
