const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Joi = require("joi")

const bookEditionSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    isbn: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, default: 1 },
    isAvailable: { type: Boolean, required: true, default: true },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

const validateBookEdition = (data) => {
    const schema = Joi.object({
        bookId: Joi.string().required(),
        isbn: Joi.string().required(),
        quantity: Joi.number().required(),
        isAvailable: Joi.boolean().required()
    })
    return schema.validate(data)
}


bookEditionSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.deletedAt;

        return ret
    }
})

bookEditionSchema.index({ isbn: 1 }, { unique: true })
bookEditionSchema.index({ deletedAt: 1 }, { partialFilterExpression: { deletedAt: null }, name: 'deletedAtNull' });

const bookEditionModel = mongoose.model("BookEdition", bookEditionSchema)

module.exports = {
    bookEditionModel,
    validateBookEdition
}