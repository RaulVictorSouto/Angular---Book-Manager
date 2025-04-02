import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreService } from '../../../services/genre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-genre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-genre.component.html',
  styleUrl: './modal-genre.component.css'
})
export class ModalGenreComponent {
  @Input() genreID: number | null = null;
  @Input() isOpen = false;
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitGenre = new EventEmitter<any>();

  genreForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private genreService: GenreService){
    this.genreForm = this.fb.group({
      genreName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const isEditMode = !!this.genreID;

    if(this.genreID){
      this.loadGenre(this.genreID);
    }
  }

  onSubmit(): void{
    if (this.genreForm.valid){
      this.isLoading = true;
      this.errorMessage = '';

      const genreData = {
        genreName: this.genreForm.value.genreName
      };

      if (this.isEditMode && this.genreID) {
        this.updateGenre(this.genreID, genreData);
      } else {
        this.createGenre(genreData);
      }
    }
  }

  private createGenre(genreData: any): void {
    this.genreService.createGenre(genreData).subscribe({
      next: (newGenre) => {
        this.isLoading = false;
        this.submitGenre.emit(newGenre);
        this.genreService.notifyGenreCreatedOrUpdated();
        this.closeModal();
      },
      error: (error) => {
        this.handleError('Erro ao cadastrar gênero', error);
      }
    });
  }

  private updateGenre(genreID: number, genreData: any): void {
    this.genreService.editGenre(genreID, genreData).subscribe({
      next: (updateGenre) => {
        this.isLoading = false;
        this.submitGenre.emit(updateGenre);
        this.genreService.notifyGenreCreatedOrUpdated();
        this.closeModal();
      },
      error: (error) => {
        this.handleError('Erro ao atualizar autor', error);
      }
    });
  }

  loadGenre(GenreID: number): void{
    this.genreService.getGenreById(GenreID).subscribe({
      next: (genre) => {
        this.genreForm.patchValue({
          genreName: genre.genreName
        });
      },
      error: (err) => {
        console.error('Erro ao carregar genero', err);
      }
    })
  }

  closeModal(): void{
    this.close.emit();
    this.genreForm.reset();
    this.errorMessage = '';
  }

  private handleError(message: string, error: any): void {
    this.isLoading = false;
    this.errorMessage = message;
    console.error('Erro:', error);
  }

}
