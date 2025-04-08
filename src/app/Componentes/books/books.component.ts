import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model'
import { DisplayBookComponent } from "../display-book/display-book.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DisplayBookComponent, CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})

export class BooksComponent {
  books: Book[] = [];
  loading = true;
  showBookList = true;
  selectedBook: any = null;
  private bookSubscription!: Subscription;


  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.loadBooks();

    this.bookSubscription = this.bookService.bookCreated$.subscribe(() => {
      this.loadBooks();
    })
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  loadBooks(): void {
    this.bookService.getBook().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro detalhado:', {
          message: err.message,
          status: err.status,
          url: err.url,
          error: err.error
        });
        this.loading = false;
      }
    });
  }

  onBookDeleted(): void {
    this.loadBooks();
    this.selectedBook = null;
    this.showBookList = true;
  }

  onBookCreated() {
    this.loadBooks();
  }
}
