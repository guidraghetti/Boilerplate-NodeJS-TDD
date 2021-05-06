import userService from "../Services/user.service.js";
import bookService from "../Services/book.service.js";

const bookController = {};

bookController.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.findAllBooks();
    return res.json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An internal error ocurred!" });
  }
};

bookController.getBooksByGenre = async (req, res) => {
  const { genre } = req.query;
  try {
    const books = await bookService.findBookByGenre(genre);
    if (!books.length > 0) {
      return res
        .status(400)
        .json({ error: `Hasn't been found books with genre ${genre}` });
    }
    return res.json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An internal error ocurred!" });
  }
};

bookController.getUserOwnedBooks = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  try {
    const user = await userService.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }
    const books = await userService.findBooks(id, type);
    return res.json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An internal server error ocurred!" });
  }
};

bookController.postUserBook = async (req, res) => {
  const { body } = req;
  try {
    const result = await bookService.postBook(body);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An internal error ocurred!" });
  }
};

export default bookController;
