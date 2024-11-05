const express = require("express")
const borrowedBookController = require("../controllers/borrowed_book_controller")

const borrowedBookRoutes = express.Router()

borrowedBookRoutes.post("/borrow/book", borrowedBookController.createBorrowedBook)
borrowedBookRoutes.get("/borrow/book/list", borrowedBookController.getBorrowedBooks)
borrowedBookRoutes.post("/borrow/book/return", borrowedBookController.returnBook)
borrowedBookRoutes.get("/stock-log", borrowedBookController.getListStockLog)

module.exports = borrowedBookRoutes