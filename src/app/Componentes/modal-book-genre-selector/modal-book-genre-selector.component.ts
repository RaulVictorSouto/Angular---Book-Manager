import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Genre } from '../../../models/genre.model';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-modal-book-genre-selector',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './modal-book-genre-selector.component.html',
  styleUrl: './modal-book-genre-selector.component.css'
})

export class ModalBookGenreSelectorComponent implements OnInit {
  @Input() selectedGenres: any[] = [];
  @Output() genreSelected = new EventEmitter<any[]>();
  @Output() genresIdSelected = new EventEmitter<number[]>();

  filteredGenres: Genre[] = [];
  searchTerm = '';
  loading = true;

  constructor(private genreService: GenreService){}

  ngOnInit() {
    this.loadGenres();
  }

  loadGenres(){
    this.genreService.getGenre().subscribe({
      next: (genres) => {
        this.filteredGenres = genres;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar gêneros:', err);
        this.loading = false;
      }
    });
  }

  filterGenres() {
      if (!this.searchTerm) {
        this.loadGenres();
      } else {
        this.filteredGenres = this.filteredGenres.filter(genre =>
          genre.genreName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
  }


  handleGenreSelection(genre: Genre, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.isGenreSelected(genre)) {
        this.selectedGenres.push(genre);
        this.emitSelectionEvents();
      }
    } else {
      this.removeGenre(genre);
    }
  }

  removeGenre(genre: Genre) {
      const index = this.selectedGenres.findIndex(a => a.genreID === genre.genreID);

      if (index > -1) {
        this.selectedGenres.splice(index, 1);
        this.emitSelectionEvents();
      }
  }

  isGenreSelected(genre: Genre): boolean {
      return this.selectedGenres.some(a => a.genreID === genre.genreID);
  }

  private emitSelectionEvents() {
    // Emite o array completo de autores
    this.genreSelected.emit([...this.selectedGenres]);

    // Emite apenas os IDs dos autores selecionados
    const genreIds = this.selectedGenres.map(genre => genre.genreID);
    this.genresIdSelected.emit(genreIds);
  }
}
