// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Para livros
  private searchBookResults = new BehaviorSubject<Book[]>([]);
  currentBookResults = this.searchBookResults.asObservable();

  // Para autores
  private searchAuthorResults = new BehaviorSubject<Author[]>([]);
  currentAuthorResults = this.searchAuthorResults.asObservable();

  // Para gêneros
  private searchGenreResults = new BehaviorSubject<Genre[]>([]);
  currentGenreResults = this.searchGenreResults.asObservable();

  // Atualiza resultados de livros
  updateSearchBookResults(books: Book[]) {
    this.searchBookResults.next(books);
  }

  // Atualiza resultados de autores
  updateSearchAuthorResults(authors: Author[]) {
    this.searchAuthorResults.next(authors);
  }

  // Atualiza resultados de gêneros
  updateSearchGenreResults(genres: Genre[]) {
    this.searchGenreResults.next(genres);
  }

  // Limpa todos os resultados
  clearAllResults() {
    this.searchBookResults.next([]);
    this.searchAuthorResults.next([]);
    this.searchGenreResults.next([]);
  }
}
