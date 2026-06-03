import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-ch48-toolbar',
  templateUrl: './ch48-toolbar.html',
  styleUrl: './ch48-toolbar.css',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule]
})
export class Ch48Toolbar {
  cartCount: number = 3;
  notificationCount: number = 5;

  addToCart(): void { this.cartCount++; }
  clearCart(): void { this.cartCount = 0; }
  readNotifications(): void { this.notificationCount = 0; }
}
