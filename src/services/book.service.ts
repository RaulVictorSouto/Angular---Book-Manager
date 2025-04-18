import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService{
  private apiUrl = 'https://localhost:7078/book';
  private bookCreatedSource = new Subject<void>();

  constructor(private http: HttpClient) {}

  //GET
  getBook(): Observable<Book[]> {
     return this.http.get<Book[]>(this.apiUrl);
  }

  //GET BY ID
  getBookById(bookID: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookID}`);
  }

  //POST
  createBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  //PUT
  updateBook(bookID: number, formData: FormData): Observable<Book> {
    debugger;
    return this.http.put<Book>(`${this.apiUrl}/${bookID}`, formData);
  }

  //DELETE
  deleteBook(bookID: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${bookID}`);
  }

  //PESQUISA LIVROS E TAGS
  search(title?: string, tags?: string): Observable<Book[]>{
    let params: any = {};

    if(title){params.title = title;}
    if(tags){params.tags = tags;}

    return this.http.get<Book[]>(`${this.apiUrl}` + '/search' , {params});
  }


  //para atualizar a lista de livros
  bookCreated$ = this.bookCreatedSource.asObservable();

  notifyBookCreatedOrUpdated(){
    this.bookCreatedSource.next();
  }

}
