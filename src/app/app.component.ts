// src/app/app.component.ts
import { Component } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <span>Angular 19 Modern App Demo</span>
      <span class="spacer"></span>
      <nav>
        <a mat-button routerLink="/home" routerLinkActive="active">Home</a>
        <a mat-button routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <mat-toolbar color="accent" class="app-footer">
      <span>&copy; 2025 Angular Modern App</span>
    </mat-toolbar>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
