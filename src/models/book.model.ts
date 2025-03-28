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

export interface Author {
  authorID: number;
  authorName: string;
}

export interface Genre {
  genreID: number;
  genreName: string;
}
