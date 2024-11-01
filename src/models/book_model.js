const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author_id: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    title: { type: String, maxlength: 255, required: true },
    summary: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 1000, required: true },
    image_url: { type: String, required: true },
    stock: [
        {
            isbn: { type: String, required: true, unique: true },
            status: { type: Boolean, required: true, default: true }
        }
    ],
    deleted_at: { type: Date, default: null }
}, { timestamps: true });

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
