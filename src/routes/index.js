const express = require("express")
const testRoutes = require("./test_routes")
const authorController = require("../controllers/author_controller")
const upload = require("../middlewares/multers");

// const multerHandler = (req, res, next) => {
//     if (req.headers['content-type'].includes('multipart/form-data')) {
//         return upload.single('image')(req, res, next);
//     }
//     return upload.none()(req, res, next);
// };


const routes = express.Router()

// author routes
routes.post("/author", authorController.createAuthor)
routes.get("/authors", authorController.getAuthors)
routes.get("/author/:id", authorController.getAuthorsById)
routes.put("/author/:id", authorController.updateAuthor)
routes.delete("/author/:id", authorController.deleteAuthor)
routes.post("/author/upload", upload.single('image'), authorController.uploadAuthorImage)

// test routes
routes.use(testRoutes)

module.exports = routes