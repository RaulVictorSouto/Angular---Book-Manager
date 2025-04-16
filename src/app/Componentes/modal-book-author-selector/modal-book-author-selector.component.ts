import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modal-book-author-selector',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './modal-book-author-selector.component.html',
  styleUrl: './modal-book-author-selector.component.css'
})

export class ModalBookAuthorSelectorComponent implements OnInit, OnChanges {
  @Input() selectedAuthors: Author[] = []; // Autores pré-selecionados
  @Output() authorsIdSelected = new EventEmitter<number[]>();

  filteredAuthors: Author[] = [];
  searchTerm = '';
  loading = true;
  allAuthors: Author[] = [];

  constructor(private authorService: AuthorService){}

  ngOnInit() {
    this.loadAuthors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedAuthors'] && this.selectedAuthors) {
      this.updateFilteredAuthors();
    }
  }

  loadAuthors() {
    this.authorService.getAuthor().subscribe({
      next: (authors) => {
        this.allAuthors = authors,
        this.filteredAuthors = authors;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar autores:', err);
        this.loading = false;
      }
    });
  }

  filterAuthors() {
    if (!this.searchTerm) {
      this.filteredAuthors = [...this.allAuthors];
    } else {
      this.filteredAuthors = this.allAuthors.filter(author =>
        author.authorName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  handleAuthorSelection(author: Author, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Se estiver marcando, adiciona o autor
      if (!this.isAuthorSelected(author)) {
        this.selectedAuthors.push(author);
        this.emitSelectionEvents();
      }
    } else {
      // Se estiver desmarcando, remove o autor
      this.removeAuthor(author);
    }
  }

  removeAuthor(author: Author) {
    const index = this.selectedAuthors.findIndex(a => a.authorID === author.authorID);

    if (index > -1) {
      this.selectedAuthors.splice(index, 1);
      this.emitSelectionEvents();
    }
  }

  isAuthorSelected(author: Author): boolean {
    return this.selectedAuthors.some(a => a.authorID === author.authorID);
  }

  private emitSelectionEvents() {
    const authorIds = this.selectedAuthors.map(author => author.authorID);
    this.authorsIdSelected.emit(authorIds);
  }

  private updateFilteredAuthors() {
    if (this.searchTerm) {
      this.filterAuthors();
    } else {
      this.filteredAuthors = [...this.allAuthors];
    }
  }
}
