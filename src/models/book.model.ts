import { Genre } from '../models/genre.model';
import { Author } from '../models/author.model';
export interface Book {
  bookID: string;
  bookTitle: string;
  bookLanguage: string;
  bookPublisher: string;
  bookISBN: string;
  bookRating: string;
  bookCoverPage: string;
  bookTagsList: string[];
  authors: Author[];
  genres: Genre[];
}

