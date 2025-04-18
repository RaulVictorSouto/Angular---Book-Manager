import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = '';
  loading: boolean = false;

  @Output() searchResults = new EventEmitter<Book[]>();

  constructor(private bookService: BookService, private sharedDataService: SharedDataService) {}

  ngOnInit(){
    this.onSearch();
  }

  onSearch() {
    this.loading = true;
    this.bookService.search(this.searchTerm).subscribe({
      next: (books) => {
        this.sharedDataService.updateSearchBookResults(books);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar livros:', err);
        this.sharedDataService.updateSearchBookResults([]);
        this.loading = false;
      }
    });
  }
}
