import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button-menu.component.html',
  styleUrl: './button-menu.component.css'
})
export class ButtonMenuComponent {
}
