import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { Genre } from '../../../models/genre.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { Subscription } from 'rxjs';
import { ModalGenreComponent } from '../modal-genre/modal-genre.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  standalone: true,
  imports: [CommonModule, PaginationComponent, ModalGenreComponent],
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {
  genres: Genre[] = [];
  loading = true;
  private genreSubscription!: Subscription;
  showEditModal = false;
  currentGenreID: number | null = null;
  showDeleteModal = false;
  genreToDelete: number | null = null;

  //paginação
  paginatedGenres: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.loadGenres();

    this.genreSubscription = this.genreService.genreCreated$.subscribe(() => {
      this.loadGenres();
    })
  }

  ngOnDestroy(): void {
    this.genreSubscription.unsubscribe();
  }

  //para edição

  loadGenres(): void {
    debugger;
    this.genreService.getGenre().subscribe({
      next: (data) => {
        this.genres = data;
        this.totalItems = data.length;
        this.updatePaginatedGenres();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading genres', err);
        this.loading = false;
      }
    });
  }

  updatePaginatedGenres(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedGenres = this.genres.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedGenres();
  }

  openEditModal(authorId: number): void {
    this.currentGenreID = authorId;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.currentGenreID = null;
  }

  //para exclusão
  openDeleteModal(authorID: number): void {
    this.genreToDelete = authorID;
    this.showDeleteModal = true;
  }

  cancelDelete(){
    this.showDeleteModal = false;
    this.genreToDelete = null;
  }

  confirmDelete(): void {
    if (this.genreToDelete) {
      this.genreService.deleteGenre(this.genreToDelete).subscribe({
        next: () => {
          this.genres = this.genres.filter(genre => genre.genreID !== this.genreToDelete);
          this.totalItems = this.genres.length;

          const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          if (this.currentPage > totalPages) {
            this.currentPage = Math.max(totalPages, 1);
          }
          this.updatePaginatedGenres();
          this.showDeleteModal = false;
          this.genreToDelete = null;
        },
        error: (err) => console.error('Erro ao deletar gênero', err)
      });
    }
  }
}
