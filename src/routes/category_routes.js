const express = require("express")
const categoryController = require("../controllers/category_controller")

const categoryRoutes = express.Router()
categoryRoutes.post("/xategory", categoryController.createCategory)
categoryRoutes.get("/categories", categoryController.getCategorys)
categoryRoutes.get("/xategory/:id", categoryController.getCategoryById)
categoryRoutes.put("/xategory/:id", categoryController.updateCategory)
categoryRoutes.delete("/xategory/:id", categoryController.deleteCategory)

module.exports = categoryRoutes