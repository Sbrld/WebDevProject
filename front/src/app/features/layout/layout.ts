import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        window.location.href = '/login';
      }
    });
  }
}
