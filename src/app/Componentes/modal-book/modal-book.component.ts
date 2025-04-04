import { CommonModule } from '@angular/common';
 import { Component, EventEmitter, Input, Output } from '@angular/core';
 import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
 import { ModalBookAuthorSelectorComponent } from "../modal-book-author-selector/modal-book-author-selector.component";
 import { ModalBookGenreSelectorComponent } from "../modal-book-genre-selector/modal-book-genre-selector.component";
 import { ModalBookTagsComponent } from "../modal-book-tags/modal-book-tags.component";

 @Component({
   selector: 'app-modal-book',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, ModalBookAuthorSelectorComponent, ModalBookGenreSelectorComponent, ModalBookTagsComponent],
   templateUrl: './modal-book.component.html',
   styleUrl: './modal-book.component.css'
 })

 export class ModalBookComponent {
   @Input() isOpen = false;
   @Input() bookId: string | null = null;
   @Output() close = new EventEmitter<void>();
   @Output() submitBook = new EventEmitter<any>();

   bookForm: FormGroup;
   selectedFile: File | null = null;

   constructor(private fb: FormBuilder) {
     this.bookForm = this.fb.group({
       title: ['', Validators.required],
       language: ['', Validators.required],
       publisher: ['', Validators.required],
       isbn: ['', Validators.required],
       rating: ['', Validators.required],
       authors: [''],
       genders: [''],
       tags: [''],
       coverPage: ['']
     });
   }

   closeModal(): void{
     this.close.emit();
   }

   onSubmit(): void {
     if (this.bookForm.valid) {
       const formData = new FormData();
       formData.append('title', this.bookForm.value.title);
       formData.append('language', this.bookForm.value.language);
       formData.append('publisher', this.bookForm.value.publisher);
       formData.append('isbn', this.bookForm.value.isbn);
       formData.append('rating', this.bookForm.value.rating);
       formData.append('authors', this.bookForm.value.authors);
       formData.append('genders', this.bookForm.value.genders);
       formData.append('tags', this.bookForm.value.tags);

       if (this.selectedFile) {
         formData.append('coverPage', this.selectedFile);
       }

       this.submitBook.emit(formData);
       this.closeModal();
     }
   }

   onFileSelected(event: any): void {
     this.selectedFile = event.target.files[0];
   }
 }
