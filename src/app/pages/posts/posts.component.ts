import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { JsonPlaceholderService, Post } from '../../services/api.service'
import { PostCardComponent } from '../../components/post-card/post-card.component'

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, PostCardComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
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
