import { Component } from '@angular/core';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { Subscription } from 'rxjs';
import { ModalAuthorComponent } from "../modal-author/modal-author.component";
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, PaginationComponent, ModalAuthorComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  loading = true;
  showEditModal = false;
  showDeleteModal = false;
  authorToDelete: number | null = null;
  currentAuthorID: number | null = null;
  isSearching = false;

  private authorSubscriptions: Subscription[] = [];

  // Paginação
  paginatedAuthors: Author[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private authorService: AuthorService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.loadAuthors();

    this.authorSubscriptions.push(
      this.sharedDataService.currentAuthorResults?.subscribe(authors => {
        this.handleSearchResults(authors);
      })
    );

    this.authorSubscriptions.push(
      this.authorService.authorCreated$.subscribe(() => {
        this.loadAuthors();
      })
    );
  }

  ngOnDestroy(): void {
    this.authorSubscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAuthors(): void {
    this.authorService.getAuthor().subscribe({
      next: (data) => {
        this.authors = data;
        this.filteredAuthors = data;
        this.totalItems = data.length;
        this.updatePaginatedAuthors();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading authors', err);
        this.loading = false;
      }
    });
  }

  updatePaginatedAuthors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAuthors = this.filteredAuthors.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedAuthors();
  }

  openEditModal(authorId: number): void {
    this.currentAuthorID = authorId;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.currentAuthorID = null;
  }

  openDeleteModal(authorID: number): void {
    this.authorToDelete = authorID;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.authorToDelete = null;
  }

  confirmDelete(): void {
    if (this.authorToDelete) {
      this.authorService.deleteAuthor(this.authorToDelete).subscribe({
        next: () => {
          this.authors = this.authors.filter(author => author.authorID !== this.authorToDelete);
          this.filteredAuthors = this.filteredAuthors.filter(author => author.authorID !== this.authorToDelete);
          this.totalItems = this.filteredAuthors.length;

          const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          if (this.currentPage > totalPages) {
            this.currentPage = Math.max(totalPages, 1);
          }

          this.updatePaginatedAuthors();
          this.showDeleteModal = false;
          this.authorToDelete = null;
        },
        error: (err) => console.error('Erro ao deletar autor', err)
      });
    }
  }

  handleSearchResults(authors: Author[]): void {
    this.isSearching = true;
    this.filteredAuthors = authors;
    this.totalItems = authors.length;
    this.currentPage = 1;
    this.updatePaginatedAuthors();
  }
}
