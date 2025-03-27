import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./Componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "./Componentes/rodape/rodape.component";
import { ButtomMenuComponent } from "./Componentes/buttom-menu/buttom-menu.component";
import { SearchBarComponent } from "./Componentes/search-bar/search-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabecalhoComponent, RodapeComponent, ButtomMenuComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SistLivrosAngular';
}
