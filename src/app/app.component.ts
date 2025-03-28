import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./Componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "./Componentes/rodape/rodape.component";
import { ButtomMenuComponent } from "./Componentes/buttom-menu/buttom-menu.component";
import { SearchBarComponent } from "./Componentes/search-bar/search-bar.component";
import { DisplayBookComponent } from "./Componentes/display-book/display-book.component";
import { AddBottomComponent } from "./Componentes/add-bottom/add-bottom.component";
import { BookService } from './services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, CabecalhoComponent, RodapeComponent, ButtomMenuComponent, SearchBarComponent, DisplayBookComponent, AddBottomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Gerenciamento de Livros';

  books: Book[] = [];
  loading = true;
  showBookList = true;

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
