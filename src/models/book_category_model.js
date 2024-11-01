const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookCategorySchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true }
}, { timestamps: true })

const BookCategoryModel = mongoose.model("BookCategory", bookCategorySchema)

module.exports = BookCategoryModel