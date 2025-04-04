// src/app/counter/counter.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="counter">
      <h3>Contador com Angular Signals</h3>
      <p>Contagem atual: {{ count() }}</p>
      <button mat-raised-button color="accent" (click)="increment()">Incrementar</button>
    </div>
  `,
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  // Inicializa um signal com valor 0
  count = signal(0);

  increment(): void {
    this.count.update(n => n + 1);
  }
}
