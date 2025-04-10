import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

   closeModal(): void{
    this.close.emit();
    this.bookForm.reset({
      authors: [],
      genres: []
    });
    this.errorMessage = '';
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

       const bookData = {
        bookTitle: this.bookForm.value.title,
        bookLanguage: this.bookForm.value.language,
        bookPublisher: this.bookForm.value.publisher,
        bookISBN: this.bookForm.value.isbn,
        bookRating: this.bookForm.value.rating,
        authorIDs: this.bookForm.value.authors,
        genreIDS: this.bookForm.value.genres,
        bookTags: this.bookForm.value.tags || [],
        bookCoverPage: this.selectedFile || "",
       }

       if (this.isEditMode && this.bookID) {
        this.updateBook();
      } else {
        this.createBook(bookData);
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

   updateBook(){

   }

  private handleError(message: string, error: any): void {
    this.isLoading = false;
    this.errorMessage = message;
    console.error('Erro:', error);
  }

   onFileSelected(event: any): void {
     this.selectedFile = event.target.files[0];
    }
 }
