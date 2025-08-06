const response = require("../utils/response");
const Products = require("../model/products");
const imgbbUploader = require("imgbb-uploader");

class ProductsController {
  async getProducts(req, res) {
    try {
      const products = await Products.find();
      return response.success(res, "Mahsulotlar ro'yxati", products);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findById(id);
      if (!product) {
        return response.notFound(res, "Mahsulot topilmadi");
      }
      return response.success(res, "Mahsulot", product);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  // 🔹 5. Yangi mahsulot yaratish
  async createProduct(req, res) {
    try {
      let imageUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const options = {
            apiKey: process.env.IMGBB_API_KEY,
            base64string: file.buffer.toString("base64"), // bu to'g'ri
          };
          const uploaded = await imgbbUploader(options);
          imageUrls.push(uploaded.url);
        }
      }

      const newProductData = {
        ...req.body,
        ...(imageUrls.length > 0 && { images: imageUrls }),
      };

      const result = await Products.create(newProductData);
      if (!result) {
        return response.error(res, "Mahsulot yaratilmadi");
      }
      return response.created(res, "Mahsulot muvoffaqiyatli yaratildi", result);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findByIdAndDelete(id);
      if (!product) {
        return response.notFound(res, "Mahsulot topilmadi");
      }
      return response.success(
        res,
        "Mahsulot muvoffaqiyatli o'chirildi",
        product
      );
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      let imageUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const base64Image = file.buffer.toString("base64");
          const uploaded = await imgbbUploader(imgbbApiKey, base64Image);
          imageUrls.push(uploaded.url);
        }
      }

      const updatedData = {
        ...req.body,
        ...(imageUrls.length > 0 && { images: imageUrls }),
      };

      const product = await Products.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!product) {
        return response.notFound(res, "Mahsulot topilmadi");
      }

      return response.success(
        res,
        "Mahsulot muvoffaqiyatli yangilandi",
        product
      );
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }
}

module.exports = new ProductsController();
