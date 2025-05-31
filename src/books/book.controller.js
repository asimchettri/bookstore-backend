const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(201)
      .send({ message: "book created successfully", book: newBook });
  } catch (error) {
    console.error("error creeating book:", error);
    res.status(500).send({ message: "failed to create book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("error fetching book:", error);
    res.status(500).send({ message: "failed to fetch book" });
  }
};

const getsingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("error fetching book:", error);
    res.status(500).send({ message: "failed to fetch book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //id,olddata,new:true means return the updated data
    if (!updatedBook) {
      return res.status(404).send({ message: "book not found" });
    }
    res.status(200).send({
      message: "book updated sucessfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("error updating book:", error);
    res.status(500).send({ message: "failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
 const deletedBook= await Book.findByIdAndDelete(req.params.id)
 if(!deleteBook){
     return res.status(404).send({ message: "book not found" });
 }
 res.status(200).send({
    message:"book deleted sucessfully",
    book: deletedBook
 })


  } catch (error) {
    console.error("error deleting book:", error);
    res.status(500).send({ message: "failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getsingleBook,
  updateBook,
  deleteBook,
};
