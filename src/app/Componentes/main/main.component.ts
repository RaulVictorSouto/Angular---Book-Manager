import { Component } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { ButtonMenuComponent } from "../button-menu/button-menu.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { AddBottomComponent } from "../add-bottom/add-bottom.component";
import { RodapeComponent } from "../rodape/rodape.component";
import { BodyPageComponent } from "../body-page/body-page.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CabecalhoComponent, ButtonMenuComponent, SearchBarComponent, AddBottomComponent, RodapeComponent, BodyPageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
