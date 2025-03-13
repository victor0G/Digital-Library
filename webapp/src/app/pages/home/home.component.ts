import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchBooks();
  }
  
  fetchBooks(): void {
    const apiUrl = `http://localhost:3000/book/books`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        this.books = data.books;
      })
      .catch(console.error);
  }
}
