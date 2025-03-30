import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService{
  private apiUrl = 'https://localhost:7078/book';

  constructor(private http: HttpClient) {}

  getBook(): Observable<Book[]> {
     return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(bookData: FormData): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, bookData);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: string, bookData: FormData): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, bookData);
  }
}
