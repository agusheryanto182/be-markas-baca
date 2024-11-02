const mongoose = require("mongoose")
const Schema = mongoose.Schema

const borrowedBookSchema = new Schema({
    borrowerId: { type: Schema.Types.ObjectId, ref: "Borrower", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedAt: { type: Date, required: true },
    expectedReturnAt: { type: Date, required: true },
    returnedAt: { type: Date, default: null }
}, { timestamps: true })

const BorrowedBookModel = mongoose.model("BorrowedBook", borrowedBookSchema)
module.exports = BorrowedBookModel