import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Genre} from '../models/genre.model'

@Injectable({
  providedIn: 'root'
})

export class GenreService{
  private apiUrl = 'https://localhost:7078/genre';

  constructor(private http: HttpClient) {}

  getGenre(): Observable<Genre[]>{
    debugger;
    return this.http.get<Genre[]>(this.apiUrl);
  }
}

