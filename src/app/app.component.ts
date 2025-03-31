import { Component, OnDestroy} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./Componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "./Componentes/rodape/rodape.component";
import { ButtonMenuComponent } from "./Componentes/button-menu/button-menu.component";
import { SearchBarComponent } from "./Componentes/search-bar/search-bar.component";
import { AddBottomComponent } from "./Componentes/add-bottom/add-bottom.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
//import { RouteService } from '../services/route.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, CabecalhoComponent, RodapeComponent, ButtonMenuComponent, SearchBarComponent, AddBottomComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Gerenciador de Livros';
}
