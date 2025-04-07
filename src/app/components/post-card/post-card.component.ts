import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { Post } from '../../services/api.service'

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card *ngIf="post" style="margin-bottom: 1rem;">
      <mat-card-header>
        <mat-card-title>Post #{{ post.id }}</mat-card-title>
        <mat-card-subtitle>Usuário: {{ post.userId }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post: Post | null = null
}
