// src/app/services/json-placeholder.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {
  private API_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`).pipe(
      catchError(error => {
        console.error('Erro ao buscar posts:', error)
        return throwError(() => new Error('Erro ao buscar posts'))
      })
    )
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`).pipe(
      catchError(error => {
        console.error(`Erro ao buscar post ${id}:`, error)
        return throwError(() => new Error('Erro ao buscar post'))
      })
    )
  }
}
