import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { GenreService } from '../../../services/genre.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../../services/route.services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  searchTerm: string = '';
  loading: boolean = false;
  searchType: 'books' | 'authors' | 'genres' = 'books';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private sharedDataService: SharedDataService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.onSearch();
    this.setSearchType(this.routeService.getCurrentRoute());
    this.routeService.currentRoute$.subscribe(route => {
      this.setSearchType(route);
    });
  }

  private setSearchType(route: string): void {
    if (route.includes('/autores')) {
      this.searchType = 'authors';
    } else if (route.includes('/generos')) {
      this.searchType = 'genres';
    } else {
      this.searchType = 'books';
    }
  }

  onSearch(): void {
    this.loading = true;
    this.sharedDataService.clearAllResults();

    switch (this.searchType) {
      case 'books':
        this.bookService.searchBook(this.searchTerm).subscribe({
          next: (books) => {
            this.sharedDataService.updateSearchBookResults(books);
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao buscar livros:', err);
            this.loading = false;
          }
        });
        break;

      case 'authors':
        this.authorService.searchAuthor(this.searchTerm).subscribe({
          next: (authors) => {
            this.sharedDataService.updateSearchAuthorResults(authors);
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao buscar autores:', err);
            this.loading = false;
          }
        });
        break;

      case 'genres':
        this.genreService.searchGenre(this.searchTerm).subscribe({
          next: (genres) => {
            this.sharedDataService.updateSearchGenreResults(genres);
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao buscar gêneros:', err);
            this.loading = false;
          }
        });
        break;
    }
  }
}

