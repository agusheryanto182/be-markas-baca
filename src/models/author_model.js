const mongoose = require("mongoose")
const schema = mongoose.Schema

const authorSchema = new schema({
    name: { type: String, maxlength: 255, required: true },
    deleted_at: { type: Date, default: null }
}, { timestamps: true })

const AuthorModel = mongoose.model("Author", authorSchema)
module.exports = AuthorModel;