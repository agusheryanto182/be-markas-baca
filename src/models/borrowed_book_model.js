const mongoose = require("mongoose")
const Schema = mongoose.Schema

const borrowedBookSchema = new Schema({
    borrower_id: { type: Schema.Types.ObjectId, ref: "Borrower", required: true },
    book_id: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowed_at: { type: Date, required: true },
    expected_return_at: { type: Date, required: true },
    returned_at: { type: Date, default: null }
}, { timestamps: true })

const BorrowedBookModel = mongoose.model("BorrowedBook", borrowedBookSchema)
module.exports = BorrowedBookModel