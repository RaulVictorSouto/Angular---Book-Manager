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
}
