import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateClaimComponent } from './create-claim/create-claim';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CreateClaimComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('FindIt');
  showForm = false;

  openForm(): void {
    this.showForm = true;
  }

  onFormClosed(submitted: boolean): void {
    this.showForm = false;
    // The claims list (on another branch) can listen for the `submitted` flag to refresh
  }
}
