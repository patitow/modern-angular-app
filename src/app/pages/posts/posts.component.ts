// src/app/posts/posts.component.ts
import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { JsonPlaceholderService, Post } from '../../services/api.service'
import { PostCardComponent } from '../../components/post-card/post-card.component'

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, PostCardComponent],
  template: `
    <section class="posts">
      <h2>Posts</h2>

      <!-- Spinner de carregamento -->
      <mat-progress-spinner *ngIf="loading()" mode="indeterminate"></mat-progress-spinner>

      <!-- Lista de posts em cartões -->
      <div *ngIf="!loading() && !error()" class="posts-list">
        <app-post-card *ngFor="let post of posts()" [post]="post"></app-post-card>
      </div>

      <!-- Mensagem de erro, se existir -->
      <p *ngIf="error()" class="error">{{ error() }}</p>
    </section>
  `,
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  // Sinais
  posts = signal<Post[]>([])
  loading = signal<boolean>(true)
  error = signal<string | null>(null)

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {}

  ngOnInit(): void {
    this.loading.set(true)
    this.jsonPlaceholderService.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts.set(data)
        this.loading.set(false)
      },
      error: err => {
        this.error.set(err.message || 'Erro ao carregar posts')
        this.loading.set(false)
      },
    })
  }
}
