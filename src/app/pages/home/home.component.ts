import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { CounterComponent } from '../../components/counter/counter.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CounterComponent,
  ],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  demoForm!: FormGroup

  submittedName = signal<string | null>(null)

  users = signal<
    Array<{
      name: string
      email: string
      address?: string
    }>
  >([])

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
    })

    // (1) Carrega usuários salvos no localStorage (se existirem)
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      // Se existir algo no localStorage, parse e joga na signal de usuários
      this.users.set(JSON.parse(storedUsers))
    }
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      const user = this.demoForm.value

      // Exibe nome para feedback ao usuário
      this.submittedName.set(user.name)

      // Atualiza a lista de usuários em memória
      this.users.update(prev => [...prev, user])

      // (2) Salva a lista atualizada no localStorage
      localStorage.setItem('users', JSON.stringify(this.users()))

      // Reseta o form
      this.demoForm.reset()
    }
  }
}
