// [get] /admin/products/
const Product = require("../../models/product.model");
module.exports.product = async (req, res) => {
  //list button filter
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Tất cả",
      status: "inactive",
      class: "",
    },
  ];
  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status === req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status === "");
    filterStatus[index].class = "active";
  }
  //search condition
  const find = { deleted: false };

  // url parameters
  if (req.query.status) {
    find.status = req.query.status;
  }

  // filter search
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }
  const products = await Product.find(find);

  console.log("LIST: ", products);
  res.render("admin/pages/products/index", {
    pageTitle: "product",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
