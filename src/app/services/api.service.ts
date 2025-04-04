// src/app/services/api.service.ts
import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Signal para armazenar os posts
  postsSignal = signal<Post[]>([])

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(tap(posts => this.postsSignal.set(posts)))
  }
}
