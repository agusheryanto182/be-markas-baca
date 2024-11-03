const mongoose = require("mongoose")
const schema = mongoose.Schema
const Joi = require("joi")

const authorSchema = new schema({
    name: { type: String, maxlength: 255, required: true },
    imageUrl: { type: String, default: null },
    deletedAt: { type: Date, default: null }
}, { timestamps: true })

const AuthorModel = mongoose.model("Author", authorSchema)

const validateAuthor = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required()
    })
    return schema.validate(data)
}

authorSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.deletedAt;
        delete ret.__v;

        if (!ret.imageUrl) delete ret.imageUrl;

        return ret;
    }
});

authorSchema.index({ deletedAt: 1 }, { partialFilterExpression: { deletedAt: null }, name: 'deletedAtNull' });

module.exports = {
    AuthorModel,
    validateAuthor
};