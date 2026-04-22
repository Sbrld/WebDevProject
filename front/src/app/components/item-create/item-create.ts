import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Upload, Plus } from 'lucide-angular';
import { ItemService } from '../../services/item';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './item-create.html',
  styleUrl: './item-create.css'
})
export class ItemCreate {
  readonly Upload = Upload;
  readonly Plus = Plus;

  errorMessage = '';
  loading = false;
  selectedImageName = '';

  formData = {
    title: '',
    description: '',
    category: '',
    status: 'lost',
    location: '',
    date: ''
  };

  selectedImage: File | null = null;

  constructor(private itemService: ItemService, private router: Router) {}

  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
    this.selectedImageName = this.selectedImage ? this.selectedImage.name : '';
  }

  onSubmit() {
    if (!this.formData.title || !this.formData.description || !this.formData.category || !this.formData.location || !this.formData.date) {
      this.errorMessage = 'Fill in all required fields before publishing.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const data = new FormData();
    data.append('title', this.formData.title);
    data.append('description', this.formData.description);
    data.append('category', this.formData.category);
    data.append('status', this.formData.status);
    data.append('location', this.formData.location);
    data.append('date', this.formData.date);
    if (this.selectedImage) data.append('image', this.selectedImage);

    this.itemService.createItem(data).subscribe({
      next: () => this.router.navigate(['/my-items']),
      error: () => {
        this.errorMessage = 'Failed to create item. Make sure you are logged in.';
        this.loading = false;
      }
    });
  }
}
