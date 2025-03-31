import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { Genre } from '../../../models/genre.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  loading = true;

  //paginação
  paginatedGenres: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    debugger;
    this.loadGenres();
  }

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
}
