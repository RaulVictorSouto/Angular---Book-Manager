import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modal-book-author-selector',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './modal-book-author-selector.component.html',
  styleUrl: './modal-book-author-selector.component.css'
})

export class ModalBookAuthorSelectorComponent implements OnInit {
  @Input() selectedAuthors: any[] = []; // Autores pré-selecionados
  @Output() authorsSelected = new EventEmitter<any[]>(); // Emite a lista atualizada

  filteredAuthors: Author[] = [];
  searchTerm = '';
  loading = true;

  constructor(private authorService: AuthorService){}

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthor().subscribe({
      next: (authors) => {
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
      this.loadAuthors();
    } else {
      this.filteredAuthors = this.filteredAuthors.filter(author =>
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
        this.authorsSelected.emit([...this.selectedAuthors]);
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
      this.authorsSelected.emit([...this.selectedAuthors]);
    }
  }

  isAuthorSelected(author: Author): boolean {
    return this.selectedAuthors.some(a => a.authorID === author.authorID);
  }
}
