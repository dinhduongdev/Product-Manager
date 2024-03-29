const Product = require("../models/product.model");

module.exports =  (objectPagination, req, countProduct) => {
  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // count

  objectPagination.totalPage = Math.ceil(
    countProduct / objectPagination.limitItem
  );

  return objectPagination;
};
