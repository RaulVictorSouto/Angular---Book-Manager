import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RouteService {
  private currentRouteSubject = new BehaviorSubject<string>('');
  public currentRoute$ = this.currentRouteSubject.asObservable();

  updateCurrentRoute(route: string) {
    this.currentRouteSubject.next(route);
  }

  getCurrentRoute(): string {
    return this.currentRouteSubject.value;
  }
}
