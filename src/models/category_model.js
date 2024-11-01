const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, maxlength: 255, required: true },
    deleted_at: { type: Date, default: null }
}, { timestamps: true })

const CategoryModel = mongoose.model("Category", categorySchema)
module.exports = CategoryModel