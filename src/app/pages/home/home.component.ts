/**
 * HomeComponent is responsible for displaying and managing a user creation form,
 * listing created users, and persisting them in localStorage. It also demonstrates
 * the usage of Angular signals in Angular 16+.
 */
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
  /**
   * Reactive form instance for user input.
   */
  demoForm!: FormGroup

  /**
   * Holds the name of the last submitted user.
   */
  submittedName = signal<string>('')

  /**
   * Holds the list of created users.
   */
  users = signal<
    Array<{
      name: string
      email: string
      address?: string
    }>
  >([])

  /**
   * Initializes the form builder and sets up the component.
   * @param fb - An instance of FormBuilder for creating the reactive form.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Lifecycle hook that initializes the reactive form and attempts
   * to load any existing users from localStorage.
   */
  ngOnInit(): void {
    this.demoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
    })

    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      this.users.set(JSON.parse(storedUsers))
    }
  }

  /**
   * Submits the form, appends the new user to the list, saves it to localStorage,
   * and resets the form.
   */
  onSubmit(): void {
    if (this.demoForm.valid) {
      const user = this.demoForm.value

      this.submittedName.set(user.name)
      this.users.update(prev => [...prev, user])

      localStorage.setItem('users', JSON.stringify(this.users()))
      this.demoForm.reset()
    }
  }

  /**
   * Removes a user from the users list by the given index and
   * updates localStorage accordingly.
   * @param index - Index of the user to be removed.
   */
  removeUser(index: number): void {
    this.users.update(prev => {
      const updated = [...prev]
      updated.splice(index, 1)

      localStorage.setItem('users', JSON.stringify(updated))
      return updated
    })
  }
}
