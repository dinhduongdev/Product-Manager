const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
router.get("/", controller.product);
router.get("/trash", controller.trash);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-mutil", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);


router.get("/create",controller.createProduct);

module.exports = router;
