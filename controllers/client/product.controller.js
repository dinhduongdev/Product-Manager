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


//detail
module.exports.detail = async(req, res) => {
  const slug = req.params.slug
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      slug: slug,
      status:"active"
    }
  
    const product = await Product.findOne(find)
    console.log(product);
    res.render("client/pages/products/detail/index",{
      pageTitle: "Chi tiết sản phẩm",
      product: product
    })
  } catch (error) {
    res.redirect(`/products`)
  }
}