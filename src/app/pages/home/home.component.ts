// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CounterComponent } from '../../components/counter/counter.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CounterComponent],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  demoForm!: FormGroup
  submittedName: string | null = null

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      name: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      this.submittedName = this.demoForm.value.name
      this.demoForm.reset()
    }
  }
}
