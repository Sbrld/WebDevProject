import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../claim.service';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-claim.html',
  styleUrl: './create-claim.css',
})
export class CreateClaimComponent {
  @Output() closed = new EventEmitter<boolean>();

  form: FormGroup;
  submitting = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private claimService: ClaimService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: [''],
      location: [''],
      date: [''],
      status: ['lost', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = null;

    const payload = { ...this.form.value, date: this.form.value.date || null };

    this.claimService.createClaim(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.closed.emit(true);
      },
      error: () => {
        this.submitting = false;
        this.error = 'Failed to create claim. Is the backend running?';
      },
    });
  }

  close(): void {
    this.closed.emit(false);
  }
}
