// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private searchResults = new BehaviorSubject<Book[]>([]);
  currentSearchResults = this.searchResults.asObservable();

  updateSearchBookResults(books: Book[]) {
    this.searchResults.next(books);
  }
}
