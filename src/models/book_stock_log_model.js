const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const bookStockLogSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowerId: { type: Schema.Types.ObjectId, ref: "Borrower", required: true },
    action: {
        type: String,
        enum: ['borrowed', 'returned'],
        required: true
    },
    quantity: { type: Number, required: true },
}, { timestamps: true });


const validateBookStockLog = (data) => {
    const schema = Joi.object({
        bookId: Joi.string().required(),
        borrowerId: Joi.string().required(),
        status: Joi.boolean().required()
    })
    return schema.validate(data)
}

const BookStockLogModel = mongoose.model("BookStockLog", bookStockLogSchema)
module.exports = {
    BookStockLogModel,
    validateBookStockLog
}