import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modal-book-tags',
  standalone: true,
  imports: [ FormsModule, NgFor ],
  templateUrl: './modal-book-tags.component.html',
  styleUrl: './modal-book-tags.component.css'
})
export class ModalBookTagsComponent {
  tags: string[] = [];
  tagInput: string = '';

  // Método para adicionar tag
  addTag(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do Enter

    const tag = this.tagInput.trim();

    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagInput = ''; // Limpa o input
    }
  }

  // Método para remover tag
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
}
