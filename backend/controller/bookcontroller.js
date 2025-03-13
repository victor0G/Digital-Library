const Book = require("../models/book");
const path = require("path");
const fs = require("fs");

exports.getBook = async (req, res) => {
  try {
    let { page, limit, cat } = req.query;

    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default 10 books per page

    const skip = (page - 1) * limit;

    // Fetch books with pagination

    const books = await Book.find(cat ? { category: cat } : {})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count of books
    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch books", details: error.message });
  }
};

exports.addNewBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Construct image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${
      req.file.filename
    }`;

    // Save book details to database
    const newBook = new Book({
      bookName: req.body.bookName,
      author: req.body.author,
      category: req.body.category,
      rating: parseFloat(req.body.rating),
      uploadDate: req.body.uploadDate,
      imageUrl: imageUrl,
    });

    await newBook.save();
    res
      .status(201)
      .json({ message: "Book uploaded successfully", book: newBook });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to upload book", details: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookName, author, category, rating } = req.body;

    // Find the existing book
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    let imageUrl = book.imageUrl;

    // If a new image is uploaded, delete the old image
    if (req.file) {
      if (book.imageUrl) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          book.imageUrl.replace("http://localhost:3000/", "")
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }
      imageUrl = `http://localhost:3000/public/images/${req.file.filename}`;
    }

    // Update book details
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { bookName, author, category, rating, imageUrl },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update book", details: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book in the database
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Delete the image from the server (if exists)
    if (book.imageUrl) {
      const imagePath = path.join(
        __dirname,
        "..",
        book.imageUrl.replace("http://localhost:3000/", "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the book from the database
    await Book.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete book", details: error.message });
  }
};
