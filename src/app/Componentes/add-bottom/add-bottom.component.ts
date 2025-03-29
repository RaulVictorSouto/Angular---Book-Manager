import { Component } from '@angular/core';
import { ModalBookComponent } from '../modal-book/modal-book.component';

@Component({
  selector: 'app-add-bottom',
  standalone: true,
  imports: [ModalBookComponent],
  templateUrl: './add-bottom.component.html',
  styleUrl: './add-bottom.component.css'
})
export class AddBottomComponent {
  showModal = false;

  // handleBookSubmit(bookData: any) {
  //   console.log('Dados recebidos:', bookData);
  //   // Implemente a lógica de submissão aqui
  // }
}
