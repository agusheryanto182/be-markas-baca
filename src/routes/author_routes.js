const express = require("express")
const authorController = require("../controllers/author_controller")
const multerHandler = require("../middlewares/handler_multer")

const authorRoutes = express.Router()

authorRoutes.post("/author", authorController.createAuthor)
authorRoutes.get("/authors", authorController.getAuthors)
authorRoutes.get("/author/:id", authorController.getAuthorsById)
authorRoutes.put("/author/:id", authorController.updateAuthor)
authorRoutes.delete("/author/:id", authorController.deleteAuthor)
authorRoutes.post("/author/upload", multerHandler('author'), authorController.uploadAuthorImage)

module.exports = authorRoutes