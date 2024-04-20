const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const storageMulter = require("../../helper/storageMulter")
const multer  = require('multer')
const upload = multer({ storage:  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads")
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, `${uniqueSuffix}-${file.originalname}`)
      }
  }) })



router.get("/", controller.product);
router.get("/trash", controller.trash);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-mutil", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);


router.get("/create",controller.createProduct);
router.post("/create", upload.single('thumbnail'),controller.createProductPost);

module.exports = router;
