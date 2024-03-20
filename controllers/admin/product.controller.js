const searchHelper = require("../../helper/search");

// [get] /admin/products/
const Product = require("../../models/product.model");
// filterStatus
const filterStatusHelper = require("../../helper/filterStatus");
module.exports.product = async (req, res) => {
  // filterStatus
  const filterStatus = filterStatusHelper(req);
  //search condition
  const find = { deleted: false };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const objSearch = searchHelper(req);
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }
  console.log(find, objSearch);
  const products = await Product.find(find);
  res.render("admin/pages/products/index", {
    pageTitle: "product",
    products: products,
    filterStatus: filterStatus,
    keyword: req.query.keyword,
  });
};
