import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Author } from '../../models/author.model'

@Injectable({
  providedIn: 'root'
})

export class AuthorService{
  private apiUrl = 'https://localhost:7078/author';

  constructor(private http: HttpClient) {}

  getAuthor(): Observable<Author[]>{
    return this.http.get<Author[]>(this.apiUrl);
  }
}
