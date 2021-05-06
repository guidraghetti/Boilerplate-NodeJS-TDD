import Book from "../Models/book.model.js";
import userService from "./user.service.js";

const bookService = {};

bookService.postBook = async (book) => {
  const userBook = new Book({
    name: book.name,
    genre: book.genre,
    type: book.type,
    year: book.year,
    image: book.image,
  });
  const bookRes = await userBook.save();
  const result = await userService.updateUser(book.userId, bookRes);
  const user = {
    id: result._id,
    name: result.name,
    email: result.email,
    books: result.books,
  };
  return user;
};

export default bookService;
