import { Component } from '@angular/core';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { Subscription } from 'rxjs';
import { ModalAuthorComponent } from "../modal-author/modal-author.component";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, PaginationComponent, ModalAuthorComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  authors: Author[] = [];
  loading = true;
  //showModal = false;
  showEditModal = false;
  private authorSubscription!: Subscription;
  showDeleteModal = false;
  authorToDelete: number | null = null;
  currentAuthorID: number | null = null;

  // Paginação
  paginatedAuthors: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.loadAuthor();

    this.authorSubscription = this.authorService.authorCreated$.subscribe(() => {
      this.loadAuthor();
    });
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }

  //para edição
  loadAuthor(): void {
    this.authorService.getAuthor().subscribe({
      next: (data) => {
        this.authors = data;
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
    this.paginatedAuthors = this.authors.slice(startIndex, endIndex);
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


//para exclusão
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
          this.totalItems = this.authors.length;

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
}
