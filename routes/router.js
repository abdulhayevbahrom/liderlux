const router = require("express").Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

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
router.get("/product/all", productController.getProducts);
router.get("/product/get/:id", productController.getProductById);
router.put("/product/update/:id", productController.updateProduct);
router.delete("/product/delete/:id", productController.deleteProduct);

const contactController = require("../controller/contactController");

router.post("/contact/create", contactController.createContact);
router.get("/contact/all", contactController.getContacts);
router.get("/contact/get/:id", contactController.getContactById);
router.put("/contact/update/:id", contactController.updateContact);
router.delete("/contact/delete/:id", contactController.deleteContact);

module.exports = router;
