import { Component, Input } from '@angular/core';
import { BooksComponent } from "../books/books.component";
import { AuthorsComponent } from "../authors/authors.component";
import { GenresComponent } from "../genres/genres.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body-page',
  standalone: true,
  imports: [BooksComponent, AuthorsComponent, GenresComponent, CommonModule],
  templateUrl: './body-page.component.html',
  styleUrl: './body-page.component.css'
})
export class BodyPageComponent {
  @Input() currentRoute = '';
}
