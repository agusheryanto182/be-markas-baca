const mongoose = require("mongoose")
const Schema = mongoose.Schema

const borrowedBookSchema = new Schema({
    borrowerId: { type: Schema.Types.ObjectId, ref: "Borrower", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedAt: { type: Date, required: true },
    expectedReturnAt: { type: Date, required: true },
    returnedAt: { type: Date, default: null },
    penalties: { type: Number, default: 0 }
}, { timestamps: true })

const validateBorrowedBook = (data) => {
    const schema = Joi.object({
        borrowerId: Joi.string().required(),
        bookId: Joi.string().required(),
        borrowedAt: Joi.date().required(),
        expectedReturnAt: Joi.date().required()
    })
    return schema.validate(data)
}

borrowedBookSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v
        if (ret.penalties === 0) delete ret.penalties
        if (!ret.returnedAt) delete ret.returnedAt
        return ret
    }
})

const BorrowedBookModel = mongoose.model("BorrowedBook", borrowedBookSchema)
module.exports = {
    BorrowedBookModel,
    validateBorrowedBook
}