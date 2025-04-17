import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalBookAuthorSelectorComponent } from "../modal-book-author-selector/modal-book-author-selector.component";
import { ModalBookGenreSelectorComponent } from "../modal-book-genre-selector/modal-book-genre-selector.component";
import { ModalBookTagsComponent } from "../modal-book-tags/modal-book-tags.component";
import { BookService } from '../../../services/book.service';

 @Component({
   selector: 'app-modal-book',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, ModalBookAuthorSelectorComponent, ModalBookGenreSelectorComponent, ModalBookTagsComponent],
   templateUrl: './modal-book.component.html',
   styleUrl: './modal-book.component.css'
 })

 export class ModalBookComponent {
   @Input() isOpen = false;
   @Input() bookID: number | null = null;
   @Output() close = new EventEmitter<void>();
   @Output() submitBook = new EventEmitter<any>();

   bookForm: FormGroup;
   selectedFile: File | null = null;
   isLoading = false;
   errorMessage: string | null = null;
   successMessage: string | null = null;
   isEditMode = false;
   bookGenres: any[] = [];
   bookAuthors: any[] = [];


  constructor(private fb: FormBuilder, private bookService: BookService) {
     this.bookForm = this.fb.group({
       title: ['', Validators.required],
       language: ['', Validators.required],
       publisher: ['', Validators.required],
       isbn: ['', Validators.required],
       rating: ['', Validators.required],
       authors: [[]],
       genres: [[]],
       tags: [[]],
       coverPage: ['']
     });
   }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && this.bookID) {
      this.isEditMode = true;
      this.loadBookForEdit(this.bookID);
    }
  }

   closeModal(): void {
    this.close.emit();
    this.bookForm.reset({
      authors: [],
      genres: [],
      tags: []
    });
    this.errorMessage = '';
    this.isEditMode = false;
    this.bookID = null;
  }

  // Métodos para atualizar o form com os dados dos componentes filhos
  onAuthorsSelected(authorIds: number[]) {
    this.bookForm.patchValue({
      authors: authorIds
    });
  }

  onGenresSelected(genreIds: number[]) {
    this.bookForm.patchValue({
      genres: genreIds
    });
  }

  onTagsSelected(tags: string[]) {
    this.bookForm.patchValue({
      tags: tags
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const bookPayload = {
        bookTitle: this.bookForm.value.title,
        bookLanguage: this.bookForm.value.language,
        bookPublisher: this.bookForm.value.publisher,
        bookISBN: this.bookForm.value.isbn,
        bookRating: this.bookForm.value.rating,
        authorIDs: this.bookForm.value.authors || [],
        genreIDs: this.bookForm.value.genres || [],
        bookTags: this.bookForm.value.tags || [],
        bookCoverPage: this.bookForm.value.coverPage || null
      };

      if (this.isEditMode && this.bookID) {
        this.updateBook(this.bookID, bookPayload);
      } else {
        this.createBook(bookPayload);
      }
    }
  }

   createBook(bookData: any): void{
    this.bookService.createBook(bookData).subscribe({
      next: (newBook) => {
        this.isLoading = false;
        this.submitBook.emit(newBook);
        this.bookService.notifyBookCreatedOrUpdated();
        this.closeModal();
      },
      error: (error) => {
        this.handleError('Erro ao cadastrar gênero', error);
      }
    });
   }

  private handleError(message: string, error: any): void {
    this.isLoading = false;
    this.errorMessage = message;
    console.error('Erro:', error);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ['image/png', 'image/jpeg'];

      if (this.selectedFile.size > maxSize) {
        alert('Arquivo muito grande. Máximo permitido: 2MB.');
        return;
      }

      if (!allowedTypes.includes(this.selectedFile.type)) {
        alert('Tipo de arquivo inválido. Apenas PNG e JPEG são aceitos.');
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        if (result) {
          const base64 = result.split(',')[1]; // remove 'data:image/...;base64,'
          this.bookForm.patchValue({
            coverPage: base64
          });
        }
      };

      reader.onerror = () => {
        console.error('Erro ao ler o arquivo:', reader.error);
        alert('Erro ao ler o arquivo.');
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }


  //para edição

  updateBook(bookID: number, bookData: any){
    debugger;
    this.bookService.updateBook(bookID, bookData).subscribe({
      next: (updatedBook) => {
        this.isLoading = false;
        this.submitBook.emit(updatedBook);
        this.bookService.notifyBookCreatedOrUpdated();
        this.closeModal();
      },
      error: (error) => {
        this.handleError('Erro ao atualizar o livro', error);
      }
    });
  }


  loadBookForEdit(bookID: number): void {
    debugger;
    this.isLoading = true;
    this.bookService.getBookById(bookID).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.bookTitle,
          language: book.bookLanguage,
          publisher: book.bookPublisher,
          isbn: book.bookISBN,
          rating: book.bookRating,
          authors: book.authors.map((a: any) => a.authorID),
          genres: book.genres.map((g: any) => g.genreID),
          tags: book.bookTagsList || [],
          coverPage: book.bookCoverPage || ''
        });
        this.bookGenres = book.genres;
        this.bookAuthors = book.authors;
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError('Erro ao carregar livro', error);
      }
    });
  }


 }
