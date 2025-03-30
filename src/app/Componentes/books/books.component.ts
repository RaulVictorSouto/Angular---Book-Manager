import { Component, OnInit  } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../../models/book.model';
import { ModalBookComponent } from "../modal-book/modal-book.component";
import { DisplayBookComponent } from "../display-book/display-book.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ModalBookComponent, DisplayBookComponent, CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})

export class BooksComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  showBookList = true;
  selectedBook: any = null;
  isEditModalOpen = false;

  openEditModal(book: any){
    this.selectedBook = book;
    this.isEditModalOpen = true;
  }

  constructor(private bookService: BookService){}

  ngOnInit(): void {
      this.loadBooks();
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
}
