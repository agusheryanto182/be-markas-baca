const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookStockLogSchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrower_id: { type: Schema.Types.ObjectId, ref: "Borrower", required: true },
    status: { type: Boolean, required: true, default: true },
}, { timestamps: true })

const BookStockLogModel = mongoose.model("BookStockLog", bookStockLogSchema)
module.exports = BookStockLogModel