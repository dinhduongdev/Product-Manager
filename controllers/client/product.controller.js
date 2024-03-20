// [get] /products/

const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  // lấy ra tất cả data trong Mongo
  var products = [];
  try {
    products = await Product.find({});
    products.length > 0
      ? console.log("products", products)
      : console.log("undefined");
  } catch (error) {
    console.log("error", error);
  }
  const newProducts = products.map((product) => {
    product.priceNew = (
      (product.price * (100 - product.discountPercentage)) /
      100
    ).toFixed(2);
    return product;
  });

  console.log("newProducts", newProducts);

  console.log("products new: ", products);
  res.render("client/pages/products/index", {
    pageTitle: "San pham",
    productList: newProducts,
  });
};
