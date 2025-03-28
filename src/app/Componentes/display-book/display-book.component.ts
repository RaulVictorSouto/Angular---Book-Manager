import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book.model';


@Component({
  selector: 'app-display-book',
  standalone: true,
  imports: [],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: Book | null = null;

  getAuthorsString(): string {
    if (!this.book?.authors?.length) return 'Autor desconhecido';

    const authors = this.book.authors.map(a => a.authorName);
    if (authors.length <= 2) {
      return authors.join(' e ');
    }
    return `${authors.slice(0, 2).join(', ')} e +${authors.length - 2}`;
  }

  getCoverImage(): string {
    return this.book?.bookCoverPage || 'assets/images/default-cover.jpg';
  }
}
