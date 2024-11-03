const express = require("express")
const testRoutes = require("./test_routes")
const authorController = require("../controllers/author_controller")
const categoryController = require("../controllers/category_controller")
const bookController = require("../controllers/book_controller")
const multerHandler = require("../middlewares/handler_multer")

const routes = express.Router()

// author routes
routes.post("/author", authorController.createAuthor)
routes.get("/authors", authorController.getAuthors)
routes.get("/author/:id", authorController.getAuthorsById)
routes.put("/author/:id", authorController.updateAuthor)
routes.delete("/author/:id", authorController.deleteAuthor)
routes.post("/author/upload", multerHandler('author'), authorController.uploadAuthorImage)


// category routes 
routes.post("/category", categoryController.createCategory)
routes.get("/categories", categoryController.getCategorys)
routes.get("/category/:id", categoryController.getCategoryById)
routes.put("/category/:id", categoryController.updateCategory)
routes.delete("/category/:id", categoryController.deleteCategory)

// book routes
routes.post("/book", bookController.createBook)
routes.get("/books", bookController.getBooks)
routes.get("/book/:id", bookController.getBookById)
routes.put("/book/:id", bookController.updateBook)
routes.delete("/book/:id", bookController.deleteBook)
routes.post("/book/upload", multerHandler('book'), bookController.uploadBookImage)

// test routes
routes.use(testRoutes)

module.exports = routes