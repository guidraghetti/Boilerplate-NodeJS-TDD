import Book from "../Models/book.model.js";
import userService from "./user.service.js";

const bookService = {};

bookService.postBook = async (book) => {
  const userBook = new Book({
    name: book.name,
    genre: book.genre,
    ISBN: book.ISBN,
    type: book.type,
    year: book.year,
    image: book.image,
  });
  let haveBook = await bookService.findBookByISBN(userBook.ISBN);
  if (!haveBook.length > 0) {
    haveBook = await userBook.save();
  }
  const result = await userService.updateUser(book.userId, haveBook);
  const user = {
    id: result._id,
    name: result.name,
    email: result.email,
    books: result.books,
  };

  return user;
};

bookService.findAllBooks = async () => Book.find({});
bookService.findBookByGenre = async (genre) => Book.find({ genre });
bookService.findBookByISBN = async (ISBN) => Book.find({ ISBN });

export default bookService;
