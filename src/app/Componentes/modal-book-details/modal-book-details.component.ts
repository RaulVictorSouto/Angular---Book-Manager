import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-book-details.component.html',
  styleUrl: './modal-book-details.component.css'
})
export class ModalBookDetailsComponent {
  @Input() bookID: number | null = null;
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onBookDeleted = new EventEmitter<void>();

  book: Book | null = null;
  books: Book[] = [];
  loading: boolean = false;
  bookToDelete: number | null = null;
  showDeleteModal = false;

  constructor(private bookService: BookService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Verifica se bookID mudou e se tem valor
    if (changes['bookID'] && this.bookID) {
      this.loadBook(this.bookID);
    }

    // Se o modal foi aberto e já temos um bookID, carrega os dados
    if (changes['isVisible'] && this.isVisible && this.bookID) {
      this.loadBook(this.bookID);
    }
  }

  loadBook(bookID: number): void {
    this.loading = true;
    this.bookService.getBookById(bookID).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro:', err);
        this.loading = false;
      }
    });
  }

  closeModal() {
    this.onClose.emit();
  }

  getAuthorsString(): string {
    if (!this.book?.authors?.length) return 'Autor desconhecido';
    return this.book.authors.map(a => a.authorName).join(', ');
  }

  getGenreString(): string{
    if (!this.book?.genres?.length) return 'Gênero não encotrado';
    return this.book.genres.map(a => a.genreName).join(', ');
  }

  getTagString(): string{
    if (!this.book?.bookTagsList?.length) return 'Nenhuma tag registrada';
    return this.book.bookTagsList.join(', ');
  }


  //para exclusão
  openDeleteModal(bookID: number): void {
    this.bookToDelete = bookID;
    this.showDeleteModal = true;
    this.isVisible = false;
  }

  cancelDelete(){
    this.showDeleteModal = false;
    this.bookToDelete = null;
    this.isVisible = true;
  }

  confirmDelete(): void {
    if (this.bookToDelete) {
      this.bookService.deleteBook(this.bookToDelete).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.bookID !== this.bookToDelete);
          this.showDeleteModal = false;
          this.bookToDelete = null;
          this.onBookDeleted.emit();
        },
        error: (err) => console.error('Erro ao deletar gênero', err)
      });
    }
  }
}
