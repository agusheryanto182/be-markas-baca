const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    title: { type: String, maxlength: 255, required: true },
    summary: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 1000, required: true },
    imageUrl: { type: String, default: null },
    stock: [
        {
            isbn: { type: String, required: true, unique: true },
            status: { type: Boolean, required: true, default: true }
        }
    ],
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
