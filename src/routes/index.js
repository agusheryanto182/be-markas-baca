const express = require("express")
const testRoutes = require("./test_routes")
const authorRoutes = require("./author_routes")
const categoryRoutes = require("./category_routes")
const bookRoutes = require("./book_routes")
const borrowerRoutes = require("./borrower_routes")

const routes = express.Router()

// author routes
routes.use(authorRoutes)

// category routes 
routes.use(categoryRoutes)

// book routes
routes.use(bookRoutes)

// borrower routes 
routes.use(borrowerRoutes)

// test routes
routes.use(testRoutes)

module.exports = routes