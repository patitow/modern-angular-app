// src/app/about/about.component.ts
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <section class="about">
      <mat-card>
        <mat-card-header>
          <mat-card-title>About</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>
            Esta é uma aplicação Angular moderna demonstrando boas práticas como componentes
            standalone, lazy loading, formulários reativos com Angular Material, uso de Angular
            Signals para reatividade e outras otimizações.
          </p>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {}
