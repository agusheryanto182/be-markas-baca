const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const customError = require("../errors");
const RES = require("../config/resMessage");
const { CategoryModel } = require('./category_model');
const { AuthorModel } = require('./author_model');

const bookSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    title: { type: String, maxlength: 255, required: true },
    summary: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 1000, required: true },
    imageUrl: { type: String, default: null },
    bookEditions: [{ type: Schema.Types.ObjectId, ref: "BookEdition" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

const validateBook = (data) => {
    const schema = Joi.object({
        authorId: Joi.string().required(),
        title: Joi.string().max(255).required(),
        summary: Joi.string().max(255).required(),
        description: Joi.string().max(1000).required(),
        bookEditions: Joi.array().items(
            Joi.object({
                isbn: Joi.string().required(),
                quantity: Joi.number().required(),
                isAvailable: Joi.boolean().required()
            })
        ).required(),
        categories: Joi.array().items(
            Joi.object({
                _id: Joi.string().required()
            })
        )
    });
    return schema.validate(data);
};

// const listValidateOfBook = {
//     authorId: Joi.string().required(),
//     title: Joi.string().max(255).required(),
//     summary: Joi.string().max(255).required(),
//     description: Joi.string().max(1000).required(),
//     stock: Joi.array().items(
//         Joi.object({
//             isbn: Joi.string().required(),
//             status: Joi.boolean().required(),
//             quantity: Joi.number().required()
//         })
//     ),
//     categories: Joi.array().items(
//         Joi.object({
//             _id: Joi.string().required()
//         })
//     )
// }

// const customValidateBook = (data) => {
//     const dynamicSchema = Object.keys(data).reduce((schema, key) => {
//         if (listValidateOfBook[key]) {
//             schema[key] = listValidateOfBook[key];
//         }

//         return schema;
//     }, {});
//     const schema = Joi.object(dynamicSchema);
//     return schema.validate(data);
// }


bookSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.deletedAt;
        delete ret.__v;

        if (!ret.imageUrl) delete ret.imageUrl;

        return ret
    }
})

const validateAuthorAndCategories = async function (next) {
    try {
        if (this.categories) {
            const categoriesExist = await CategoryModel.find({ _id: { $in: this.categories }, deletedAt: null }).select('_id');
            if (categoriesExist.length !== this.categories.length) {
                return next(new customError.NotFoundError(RES.NOT_FOUND, RES.CATEGORY_NOT_FOUND));
            }
        }

        if (this.authorId) {
            const authorExists = await AuthorModel.findOne({ _id: this.authorId, deletedAt: null }).select('_id');
            if (!authorExists) {
                return next(new customError.NotFoundError(RES.NOT_FOUND, RES.AUTHOR_NOT_FOUND));
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

bookSchema.pre("save", validateAuthorAndCategories);

bookSchema.pre("findOneAndUpdate", async function (next) {
    const updateData = this.getUpdate();

    if (updateData.categories) {
        this.categories = updateData.categories;
    }

    if (updateData.authorId) {
        this.authorId = updateData.authorId;
    }

    await validateAuthorAndCategories.call(this, next);
});

bookSchema.index({ deletedAt: 1 }, { partialFilterExpression: { deletedAt: null } }, "name", "deletedAtNull");

const BookModel = mongoose.model("Book", bookSchema);

module.exports = {
    BookModel,
    validateBook,
    // customValidateBook
}
