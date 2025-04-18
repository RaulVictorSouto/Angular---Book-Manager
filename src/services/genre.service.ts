import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import {Genre} from '../models/genre.model'

@Injectable({
  providedIn: 'root'
})

export class GenreService{
  private apiUrl = 'https://localhost:7078/genre';
  private genreCreatedSource = new Subject<void>();

  constructor(private http: HttpClient) {}

  //GET
  getGenre(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.apiUrl);
  }

  //GET BY ID
  getGenreById(genreID: number): Observable<Genre>{
    return this.http.get<Genre>(`${this.apiUrl}/${genreID}`);
  }

  //POST
  createGenre(genre: {genreName: string}): Observable<Genre>{
    return this.http.post<Genre>(this.apiUrl, genre);
  }

  //PUT
  editGenre(genreID: number, genreData: any): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}/${genreID}`, genreData);
  }

  //DELETE
  deleteGenre(genreID: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${genreID}`);
  }

    //PESQUISA AUTORES
      searchGenre(name?: string): Observable<Genre[]>{
        let params: any = {};
        if(name){params.name = name;}
        return this.http.get<Genre[]>(`${this.apiUrl}` + '/search' , {params});
      }



  //para atualizar a lista de generos
  genreCreated$ = this.genreCreatedSource.asObservable();

  notifyGenreCreatedOrUpdated() {
    this.genreCreatedSource.next();
  }


}

