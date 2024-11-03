const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const borrowerSchema = new Schema({
    name: { type: String, maxlength: 255, required: true },
    joinedAt: { type: Date, required: true, default: Date.now() },
    deletedAt: { type: Date, default: null }
}, { timestamps: true })

const validateBorrower = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required()
    })
    return schema.validate(data)
}

borrowerSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.deletedAt;
        delete ret.__v;

        return ret
    }
})

borrowerSchema.index({ deletedAt: 1 }, { partialFilterExpression: { deletedAt: null } }, "name", "deletedAtNull");

const BorrowerModel = mongoose.model("Borrower", borrowerSchema)

module.exports = {
    BorrowerModel,
    validateBorrower
}