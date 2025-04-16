import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
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

export class ModalBookGenreSelectorComponent implements OnInit, OnChanges {
  @Input() selectedGenres: Genre[] = [];
  @Output() genresIdSelected = new EventEmitter<number[]>();

  filteredGenres: Genre[] = [];
  searchTerm = '';
  loading = true;
  allGenres: Genre[] = [];

  constructor(private genreService: GenreService) {}

  ngOnInit() {
    this.loadGenres();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGenres'] && this.selectedGenres) {
      // Atualiza a lista filtrada quando os gêneros selecionados mudam
      this.updateFilteredGenres();
    }
  }

  loadGenres() {
    this.genreService.getGenre().subscribe({
      next: (genres) => {
        this.allGenres = genres;
        this.filteredGenres = [...genres];
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
      this.filteredGenres = [...this.allGenres];
    } else {
      this.filteredGenres = this.allGenres.filter(genre =>
        genre.genreName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  handleGenreSelection(genre: Genre, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.isGenreSelected(genre)) {
        this.selectedGenres.push(genre);
        this.emitSelection();
      }
    } else {
      this.removeGenre(genre);
    }
  }

  removeGenre(genre: Genre) {
    const index = this.selectedGenres.findIndex(g => g.genreID === genre.genreID);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
      this.emitSelection();
    }
  }

  isGenreSelected(genre: Genre): boolean {
    return this.selectedGenres.some(g => g.genreID === genre.genreID);
  }

  private emitSelection() {
    const genreIds = this.selectedGenres.map(genre => genre.genreID);
    this.genresIdSelected.emit(genreIds);
  }

  private updateFilteredGenres() {
    if (this.searchTerm) {
      this.filterGenres();
    } else {
      this.filteredGenres = [...this.allGenres];
    }
  }
}
