import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { DisplayBookComponent } from "../display-book/display-book.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DisplayBookComponent, CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  loading = true;
  showBookList = true;
  isSearching = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private bookService: BookService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.loadBooks();

    this.subscriptions.push(
      this.sharedDataService.currentBookResults.subscribe(books => {
        this.handleSearchResults(books);
      })
    );

    this.subscriptions.push(
      this.bookService.bookCreated$.subscribe(() => {
        this.loadBooks();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBook().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.loading = false;
      }
    });
  }

  handleSearchResults(books: Book[]): void {
    this.isSearching = true;
    this.filteredBooks = books;
    this.showBookList = books.length > 0;
  }

  onBookDeleted(): void {
    this.loadBooks();
    this.isSearching = false;
  }
}
