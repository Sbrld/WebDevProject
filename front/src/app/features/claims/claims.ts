import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimService, Claim } from '../../claim.service';
import { CreateClaimComponent } from '../../create-claim/create-claim';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, CreateClaimComponent],
  templateUrl: './claims.html',
  styleUrl: './claims.css',
})
export class ClaimsComponent implements OnInit {
  claims = signal<Claim[]>([]);
  loading = signal(false);
  error = signal('');
  showCreate = false;
  activeFilter = signal<string>('all');

  readonly filters = [
    { value: 'all',      label: 'All' },
    { value: 'lost',     label: 'Lost' },
    { value: 'found',    label: 'Found' },
    { value: 'claimed',  label: 'Claimed' },
    { value: 'returned', label: 'Returned' },
  ];

  readonly filtered = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.claims() : this.claims().filter(c => c.status === f);
  });

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.claimService.getClaims().subscribe({
      next: (data) => {
        this.claims.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load claims. Is the backend running?');
        this.loading.set(false);
      },
    });
  }

  onFormClosed(submitted: boolean): void {
    this.showCreate = false;
    if (submitted) this.load();
  }

  statusLabel(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
