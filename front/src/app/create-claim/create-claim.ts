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

  readonly statusOptions = [
    { value: 'lost', label: 'Lost' },
    { value: 'found', label: 'Found' },
    { value: 'claimed', label: 'Claimed' },
    { value: 'returned', label: 'Returned' },
  ];

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
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = null;

    this.claimService.createClaim(this.form.value).subscribe({
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
