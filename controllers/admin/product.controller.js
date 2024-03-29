const searchHelper = require("../../helper/search");

const Product = require("../../models/product.model");
// filterStatus
const filterStatusHelper = require("../../helper/filterStatus");
//pagination
const paginationHelper = require("../../helper/pagination");
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
  // console.log(find, objSearch);
  const countProduct = await Product.countDocuments(find);
  // pagination call function
  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req,
    countProduct
  );
  console.log(objectPagination);

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // count
  objectPagination.totalPage = Math.ceil(
    countProduct / objectPagination.limitItem
  );
  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  // [get] /admin/products/
  res.render("admin/pages/products/index", {
    pageTitle: "product",
    products: products,
    filterStatus: filterStatus,
    keyword: req.query.keyword,
    objectPagination: objectPagination,
  });
};
