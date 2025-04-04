// src/app/post-detail/post-detail.component.ts
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { JsonPlaceholderService, Post } from '../../services/api.service'
import { MatCardModule } from '@angular/material/card'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  template: `
    <section class="post-detail">
      <button mat-button color="primary" routerLink="/posts">Voltar</button>
      <mat-progress-spinner *ngIf="loading" mode="indeterminate"></mat-progress-spinner>
      <mat-card *ngIf="!loading && post">
        <mat-card-header>
          <mat-card-title>Post #{{ post.id }}</mat-card-title>
          <mat-card-subtitle>Usuário: {{ post.userId }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </mat-card-content>
      </mat-card>
      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null
  loading = true
  error: string | null = null

  constructor(
    private route: ActivatedRoute,
    private jsonPlaceholderService: JsonPlaceholderService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'))
    this.jsonPlaceholderService.getPost(postId).subscribe({
      next: (data: Post) => {
        this.post = data
        this.loading = false
      },
      error: err => {
        this.error = err.message || 'Erro ao carregar post'
        this.loading = false
      },
    })
  }
}
