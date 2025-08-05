const router = require("express").Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controllers and Validations
const adminController = require("../controller/adminController");
const productController = require("../controller/productsController");

router.post("/admin/create", adminController.createAdmin);
router.get("/admin/all", adminController.getAdmins);
router.put("/admin/update/:id", adminController.updateAdmin);
router.delete("/admin/delete/:id", adminController.deleteAdmin);
router.post("/admin/login", adminController.login);

router.post(
  "/product/create",
  upload.array("images", 10),
  productController.createProduct
);
router.get("/product/get", productController.getProducts);
router.get("/product/get/:id", productController.getProductById);
router.put(
  "/product/update/:id",
  upload.array("images", 10),
  productController.updateProduct
);
router.delete("/product/delete/:id", productController.deleteProduct);

module.exports = router;
