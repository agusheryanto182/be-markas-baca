const express = require("express")
const borrowerController = require("../controllers/borrower_controller")

const borrowerRoutes = express.Router()
borrowerRoutes.post("/borrower", borrowerController.createBorrower)
borrowerRoutes.get("/borrowers", borrowerController.getBorrowers)
borrowerRoutes.get("/borrower/:id", borrowerController.getBorrowerById)
borrowerRoutes.put("/borrower/:id", borrowerController.updateBorrower)
borrowerRoutes.delete("/borrower/:id", borrowerController.deleteBorrower)

module.exports = borrowerRoutes