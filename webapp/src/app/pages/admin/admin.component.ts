import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  books: Book[] = [];
  book: Book = {
    _id: '',
    bookName: '',
    author: '',
    category: 'fiction',
    imageUrl: '',
    rating: 1,
    uploadDate: '',
  };
  imageFile: File | null = null; // Store selected image file
  isEditMode = false;
  editId: string | null = null;

  // handle pagination
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  constructor() {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    const apiUrl = `http://localhost:3000/book/books?page=${this.currentPage}&limit=${this.pageSize}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        this.books = data.books;
        this.totalPages = data.totalPages;
      })
      .catch(console.error);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0]; // Store the file for upload
    }
  }

  async onSubmit(): Promise<void> {
    this.book.uploadDate = new Date().toLocaleString();

    const formData = new FormData();
    formData.append('bookName', this.book.bookName);
    formData.append('author', this.book.author);
    formData.append('category', this.book.category);
    formData.append('rating', this.book.rating.toString());
    formData.append('uploadDate', this.book.uploadDate);

    // Append the selected image file (if available)
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    try {
      if (this.isEditMode && this.editId !== null) {
        this.books[this.books.findIndex((b) => b._id === this.editId)] = {
          ...this.book,
        };
        const response = await fetch(
          'http://localhost:3000/book/update/' + this.editId,
          {
            method: 'PUT',
            body: formData,
          }
        );
        this.isEditMode = false;
        this.editId = null;
      } else {
        const response = await fetch('http://localhost:3000/book/add', {
          method: 'POST',
          body: formData,
        });
      }

      this.fetchBooks();
      this.resetForm();
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  }

  editBook(bookId: string): void {
    const book = this.books.find((b) => b._id === bookId);
    if (book) {
      this.book = book;
      this.isEditMode = true;
      this.editId = bookId;
    }
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      const apiUrl = `http://localhost:3000/book/delete/${bookId}`;

      fetch(apiUrl, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            this.books = this.books.filter((book) => book._id == bookId);
          }
        })
        .catch(console.error);
    }
  }

  resetForm(): void {
    this.book = {
      _id: '',
      bookName: '',
      author: '',
      category: 'fiction',
      imageUrl: '',
      rating: 1,
      uploadDate: '',
    };
    this.imageFile = null; // Reset selected file
  }
}
