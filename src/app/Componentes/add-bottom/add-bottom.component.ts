import { Component, EventEmitter, Output } from '@angular/core';
import { ModalBookComponent } from '../modal-book/modal-book.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ModalAuthorComponent } from '../modal-author/modal-author.component';
import { RouteService } from '../../../services/route.services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-bottom',
  standalone: true,
  imports: [ModalBookComponent, ModalAuthorComponent, NgIf],
  templateUrl: './add-bottom.component.html',
  styleUrl: './add-bottom.component.css'
})
export class AddBottomComponent {
  showModal = false;
  @Output() clicked = new EventEmitter<void>();
  currentRoute = '';
  private routeSub: Subscription;

  constructor(private routeService: RouteService, private router: Router) {
    // Correção: Use o operador filter para garantir que só recebemos NavigationEnd
    this.routeSub = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.currentRoute = event.url;
        this.routeService.updateCurrentRoute(event.url);
      });
  }

  handleBookSubmit(bookData: any) {
    // Lógica para submeter livro
    this.showModal = false;
  }

  handleAuthorSubmit(authorData: any) {
    // Lógica para submeter autor
    this.showModal = false;
  }

  handleGenreSubmit(genreData: any) {
    // Lógica para submeter gênero
    this.showModal = false;
  }
}
