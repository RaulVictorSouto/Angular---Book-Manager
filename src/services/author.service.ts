import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Author } from '../models/author.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthorService{
  private apiUrl = 'https://localhost:7078/author';
  private authorCreatedSource = new Subject<void>();

  constructor(private http: HttpClient) {}

  //GET
  getAuthor(): Observable<Author[]>{
    return this.http.get<Author[]>(this.apiUrl);
  }

  //GET BY ID
  getAuthorById(authorID: number): Observable<Author>{
    return this.http.get<Author>(`${this.apiUrl}/${authorID}`);
  }

  //POST
  createAuthor(author: { authorName: string }): Observable<any> {
    return this.http.post(this.apiUrl, author);
  }

  //DELETE
  deleteAuthor(authorID: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${authorID}`);
  }

  //PUT
  editAuthor(authorID: number, authorData: any): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${authorID}`, authorData);
  }




  //para atualizar a lista de autores
  // Observable que outros componentes podem escutar
  authorCreated$ = this.authorCreatedSource.asObservable();
  //metodo para emitir o evento
  notifyAuthorCreatedOrUpdated() {
    this.authorCreatedSource.next();
  }

}
