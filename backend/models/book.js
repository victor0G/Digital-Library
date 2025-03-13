const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: String,
    author: String,
    category: String,
    rating: Number,
    uploadDate: String,
    imageUrl: String,
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
