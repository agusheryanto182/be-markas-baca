const mongoose = require("mongoose")
const schema = mongoose.Schema;
const Joi = require("joi")

const categorySchema = new schema({
    name: { type: String, maxlength: 255, required: true },
    deletedAt: { type: Date, default: null }
}, { timestamps: true })

const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required()
    })
    return schema.validate(data)
}

categorySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.deletedAt;
        delete ret.__v

        return ret;
    }
})

categorySchema.index({ deletedAt: 1 }, { partialFilterExpression: { deletedAt: null } }, "name", "deletedAtNull");

const CategoryModel = mongoose.model("Category", categorySchema)
module.exports = {
    CategoryModel,
    validateCategory
}