// src/app/posts/posts.component.ts
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { ApiService, Post } from '../../services/api.service'

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <section class="posts">
      <h2>Posts</h2>
      <table mat-table [dataSource]="posts">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let post">{{ post.id }}</td>
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
    </section>
  `,
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = []
  displayedColumns: string[] = ['id', 'title', 'body']

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.fetchPosts().subscribe(posts => {
      this.posts = posts
    })
  }
}
