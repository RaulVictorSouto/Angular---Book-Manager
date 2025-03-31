import { Component } from '@angular/core';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  authors: Author[] = [];
  loading = true;
  showModal = false;
  private authorSubscription!: Subscription;

  // Paginação
  paginatedAuthors: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private authorService: AuthorService, private authorEventService: AuthorService ) { }

  ngOnInit(): void {
    this.loadAuthor();

    this.authorSubscription = this.authorService.authorCreated$.subscribe(() => {
      this.loadAuthor();
    });
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }

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
}
