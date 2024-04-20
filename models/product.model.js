const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// // schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false
  },
  slug: { type: String, slug: "title" ,unique: true },
  deletedAt: Date
 
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);


module.exports = Product;
