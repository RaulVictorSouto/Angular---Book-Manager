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
  @Input() isEditMode: boolean = false;
   @Input() isOpen = false;
   @Input() authorID: number| null = null;
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

   ngOnInit(): void {
    const isEditMode = !!this.authorID;

    if (this.authorID) {
      this.loadAuthor(this.authorID);
    }
  }

  ngOnDestroy(): void {
    this.isEditMode = false;
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

      if (this.isEditMode && this.authorID) {
        this.updateAuthor(this.authorID, authorData);
      } else {
        this.createAuthor(authorData);
      }
    }
  }

  loadAuthor(AuthorID: number): void{
    this.authorService.getAuthorById(AuthorID).subscribe({
      next: (author) => {
        this.authorForm.patchValue({
          authorName: author.authorName
        });
      },
      error: (err) => {
        console.error('Erro ao carregar autor', err);
      }
    })
  }

  private createAuthor(authorData: any): void {
    this.authorService.createAuthor(authorData).subscribe({
      next: (newAuthor) => {
        this.isLoading = false;
        this.submitAuthor.emit(newAuthor);
        this.authorService.notifyAuthorCreatedOrUpdated();
        this.closeModal();
      },
      error: (error) => {
        this.handleError('Erro ao cadastrar autor', error);
      }
    });
  }

  private updateAuthor(authorID: number, authorData: any): void {
    this.authorService.editAuthor(authorID, authorData).subscribe({
      next: (updatedAuthor) => {
        this.isLoading = false;
        this.submitAuthor.emit(updatedAuthor);
        this.authorService.notifyAuthorCreatedOrUpdated();
        this.closeModal();
      },
      error: (error) => {
        this.handleError('Erro ao atualizar autor', error);
      }
    });
  }

  private handleError(message: string, error: any): void {
    this.isLoading = false;
    this.errorMessage = message;
    console.error('Erro:', error);
  }
}
