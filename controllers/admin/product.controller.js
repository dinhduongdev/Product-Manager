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
    .sort({position: "desc"})
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

//  // [PATCH] /admin/products/change
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash('suscess', 'Cập nhật thành công');

  res.redirect("back");
};


//  // [PATCh] /admin/products/change-mutil
module.exports.changeMulti =async (req, res) => {
  const status = req.body;
  console.log(status);
  const type = status.type;
  const listId = status.ids.split(",");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: listId } }, { status: "active" });
      req.flash('suscess', `Cập nhật thành công ${listId.length} sản phẩm`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: listId } }, { status: "inactive" });
      req.flash('suscess', `Cập nhật thành công ${listId.length} sản phẩm`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: listId } }, { deleted: true, deletedAt: new Date()});
      req.flash('suscess', `Đã xóa thành công ${listId.length} sản phẩm`);
      break;
    case "change-position":
      for(item of listId){
        let [id,position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
}

//  // [PATCh] /admin/products/delete
module.exports.deleteItem = async(req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: "true" , deletedAt: new Date()});
  res.redirect("back");
}


module.exports.trash =async (req, res) => {
    // filterStatus
    const filterStatus = filterStatusHelper(req);
    //search condition
    const find = { deleted: true };
  
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
  res.render("admin/pages/products/trash/index",{
    pageTitle: "trash",
    products: products,
    filterStatus: filterStatus,
    keyword: req.query.keyword,
    objectPagination: objectPagination,
  })
}

// start create product
module.exports.createProduct = (req, res) => {
  res.render("admin/pages/products/create/index",{
    
  })
}
// end create product
