// src/app/posts/posts.component.ts
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RouterLink } from '@angular/router'
import { JsonPlaceholderService, Post } from '../../services/api.service'

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, RouterLink],
  template: `
    <section class="posts">
      <h2>Posts</h2>
      <mat-progress-spinner *ngIf="loading" mode="indeterminate"></mat-progress-spinner>
      <table *ngIf="!loading" mat-table [dataSource]="posts">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let post">
            <a [routerLink]="['/posts', post.id]">{{ post.id }}</a>
          </td>
        </ng-container>

        <!-- Title Column -->
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Título</th>
          <td mat-cell *matCellDef="let post">{{ post.title }}</td>
        </ng-container>

        <!-- Body Column -->
        <ng-container matColumnDef="body">
          <th mat-header-cell *matHeaderCellDef>Conteúdo</th>
          <td mat-cell *matCellDef="let post">{{ post.body }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = []
  loading = true
  error: string | null = null
  displayedColumns: string[] = ['id', 'title', 'body']

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {}

  ngOnInit(): void {
    this.jsonPlaceholderService.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data
        this.loading = false
      },
      error: err => {
        this.error = err.message || 'Erro ao carregar posts'
        this.loading = false
      },
    })
  }
}
