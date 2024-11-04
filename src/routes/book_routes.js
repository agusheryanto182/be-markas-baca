const express = require("express")
const bookController = require("../controllers/book_controller")
const multerHandler = require("../middlewares/handler_multer")

const bookRoutes = express.Router()
bookRoutes.post("/book", bookController.createBook)
bookRoutes.get("/books", bookController.getBooks)
bookRoutes.get("/book/:id", bookController.getBookById)
bookRoutes.put("/book/:id", bookController.updateBook)
bookRoutes.delete("/book/:id", bookController.deleteBook)
bookRoutes.delete("/book/book-editions/:id", bookController.deleteBookEditions)
bookRoutes.post("/book/upload", multerHandler('book'), bookController.uploadBookImage)

module.exports = bookRoutes