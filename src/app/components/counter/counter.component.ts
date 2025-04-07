import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: 'counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  count: WritableSignal<number> = signal(0)
  double: Signal<number> = computed(() => this.count() * 2)

  // The effect will be executed whenever count and double changes
  constructor() {
    effect(() => {
      console.log(`Count: ${this.count()}, Double: ${this.double()}`)
    })
  }

  increment(): void {
    this.count.update(n => n + 1)
  }
}
