const Admins = require("../model/AdminModel");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

class AdminController {
  async createAdmin(req, res) {
    try {
      const { username, password, fullname } = req.body;
      const hash = await bcrypt.hash(password, saltRounds);
      const admin = new Admins({ username, password: hash, fullname });
      const result = await admin.save();
      if (!result) {
        return response.error(res, "Admin yaratilmadi");
      }
      return response.created(res, "Admin muvoffaqiyatli yaratildi", result);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async getAdmins(req, res) {
    try {
      const admins = await Admins.find();
      return response.success(res, "Adminlar ro'yxati", admins);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const { username, password, fullname } = req.body;
      const hash = await bcrypt.hash(password, saltRounds);
      const admin = await Admins.findByIdAndUpdate(
        id,
        { username, password: hash, fullname },
        { new: true }
      );
      if (!admin) {
        return response.notFound(res, "Admin topilmadi");
      }
      return response.success(res, "Admin muvoffaqiyatli yangilandi", admin);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async deleteAdmin(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admins.findByIdAndDelete(id);
      if (!admin) {
        return response.notFound(res, "Admin topilmadi");
      }
      return response.success(res, "Admin muvoffaqiyatli o'chirildi", admin);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admins.findOne({ username });
      if (!admin) {
        return response.unauthorized(res, "Admin topilmadi");
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return response.unauthorized(res, "Parol xato");
      }

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      return response.success(res, "Admin muvoffaqiyatli kiritildi", {
        admin,
        token,
      });
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }
}

module.exports = new AdminController();
