import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
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

  //CREATE
  createAuthor(author: { authorName: string }): Observable<any> {
    return this.http.post(this.apiUrl, author);
  }

  //para atualizar a lista de autores
  // Observable que outros componentes podem escutar
  authorCreated$ = this.authorCreatedSource.asObservable();
  //metodo para emitir o evento
  notifyAuthorCreated() {
    this.authorCreatedSource.next();
  }

}
