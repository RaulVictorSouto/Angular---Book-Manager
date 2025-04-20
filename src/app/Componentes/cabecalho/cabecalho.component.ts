import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ButtonMenuComponent } from "../button-menu/button-menu.component";

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterModule, SearchBarComponent, ButtonMenuComponent],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  goToHome(){
    this.router.navigate(['/livros']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
