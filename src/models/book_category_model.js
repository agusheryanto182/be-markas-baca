const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookCategorySchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true }
}, { timestamps: true })

const BookCategoryModel = mongoose.model("BookCategory", bookCategorySchema)

module.exports = BookCategoryModel