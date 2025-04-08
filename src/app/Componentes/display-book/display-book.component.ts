import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Book } from '../../../models/book.model';
import { ModalBookDetailsComponent } from '../modal-book-details/modal-book-details.component';


@Component({
  selector: 'app-display-book',
  standalone: true,
  imports: [ModalBookDetailsComponent],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: Book | null = null;
  @Output() bookDeleted = new EventEmitter<void>();

  showModal = false;
  selectedBookId: number | null = null;

  getAuthorsString(): string {
    if (!this.book?.authors?.length) return 'Autor desconhecido';

    const authors = this.book.authors.map(a => a.authorName);
    if (authors.length <= 2) {
      return authors.join(' e ');
    }
    return `${authors.slice(0, 2).join(', ')} e +${authors.length - 2}`;
  }

  getCoverImage(): string {
    return this.book?.bookCoverPage || '../../assets/images/cover.jpg';
  }

  openDetailModal(book: Book) {
    if (book) {
      this.selectedBookId = book.bookID;
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedBookId = null;
  }

  handleBookDeleted() {
    this.bookDeleted.emit(); // ← Propaga a exclusão para cima
    this.closeModal();       // ← Fecha o modal
  }
}
