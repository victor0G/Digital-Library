import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';

interface Book {
  _id: string;
  bookName: string;
  author: string;
  category: string;
  imageUrl: string;
  rating: number;
  uploadDate: string;
}

interface Books {
  fiction: Book[];
  'non-fiction': Book[];
  'science-fiction': Book[];
  mystery: Book[];
  biography: Book[];
  'self-help': Book[];
}

type Categories = keyof Books;

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  currentPage = 1;
  pageSize = 10;

  books: Books = {
    fiction: [],
    'non-fiction': [],
    'science-fiction': [],
    mystery: [],
    biography: [],
    'self-help': [],
  };

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.fetchBooks();
  }

  async fetchBooks(): Promise<void> {
    const apiUrl = `http://localhost:3000/book/books?page=${this.currentPage}&limit=${this.pageSize}`;

    await Promise.all(
      (Object.keys(this.books) as Categories[]).map((cat) => {
        fetch(apiUrl + `&cat=${cat}`)
          .then((res) => res.json())
          .then((data: { books: Book[] }) => {
            this.books[cat] = data.books;
          })
          .catch(console.error);
      })
    );
  }

  getCategories(): Categories[] {
    return <Categories[]>Object.keys(this.books);
  }
}
