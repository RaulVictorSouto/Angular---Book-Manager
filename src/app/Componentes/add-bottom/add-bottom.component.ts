import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ModalBookComponent } from '../modal-book/modal-book.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
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
export class AddBottomComponent implements OnDestroy{
  showModal = false;
  @Output() clicked = new EventEmitter<void>();
  currentRoute = '';
  private destroy$ = new Subject<void>();

  constructor(private routeService: RouteService, private router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        this.currentRoute = event.url;
        this.routeService.updateCurrentRoute(event.url);
      });
  }

  handleSubmit(): void {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
