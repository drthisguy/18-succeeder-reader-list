const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema([{
  title: { type: String, required: true },
  author: { type: String, required: true },
  datePublished: { type: String, required: false },
  description: String,
  details: String,
  coverImage: String,
  buyLink: String,
  ISBN: String
}]);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
