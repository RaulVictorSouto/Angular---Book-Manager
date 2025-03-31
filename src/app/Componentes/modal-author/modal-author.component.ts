import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-modal-author',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-author.component.html',
  styleUrl: './modal-author.component.css'
})
export class ModalAuthorComponent {
   @Input() isOpen = false;
   @Input() authorId: string | null = null;
   @Output() close = new EventEmitter<void>();
   @Output() submitAuthor = new EventEmitter<any>();

   authorForm: FormGroup;
   isLoading = false;
   errorMessage = '';

   constructor(private fb: FormBuilder, private authorService: AuthorService) {
    this.authorForm = this.fb.group({
      authorName: ['', Validators.required]
    });
   }

   closeModal(): void{
    this.close.emit();
    this.authorForm.reset();
    this.errorMessage = '';
  }

  onSubmit(): void{
    if (this.authorForm.valid){
      this.isLoading = true;
      this.errorMessage = '';

      const authorData = {
        authorName: this.authorForm.value.authorName
      };

      this.authorService.createAuthor(authorData).subscribe({
        next: () => {
          this.isLoading = false;
          this.submitAuthor.emit({
            authorName: this.authorForm.value.authorName
          });
          this.authorService.notifyAuthorCreated();
          this.closeModal();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao cadastrar autor';
          console.error('Erro:', error);
        }
      })
    }
  }
}
