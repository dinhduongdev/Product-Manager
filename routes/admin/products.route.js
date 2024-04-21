const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validates = require("../../validates/admin/product.validate")
const storageMulter = require("../../helper/storageMulter")
const multer  = require('multer')
const upload = multer({ storage:  storageMulter() })



router.get("/", controller.product);
router.get("/trash", controller.trash);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-mutil", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);

//edit
router.get("/edit/:id", controller.editProduct);
router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    validates.createProductPost,
    controller.editProductPatch
);


router.get("/create",controller.createProduct);
router.post(
    "/create", upload.single('thumbnail'),
    validates.createProductPost,
    controller.createProductPost

);

module.exports = router;
