const express = require("express");
const router = express.Router();
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getsingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

//post a book
router.post("/create-book", verifyAdminToken, postABook);

//get all books
router.get("/", getAllBooks);

//get single book
router.get("/:id", getsingleBook);

//update a book   i.e put replace while patch update partial data
router.put("/edit/:id", verifyAdminToken, updateBook);

router.delete("/:id", verifyAdminToken, deleteBook);

module.exports = router;
 