const Contact = require("../model/contactModel"); // Model nomi
const response = require("../utils/response"); // Sizning umumiy javob helperingiz

class ContactController {
  // 🔹 1. Yangi kontakt yaratish
  async createContact(req, res) {
    try {
      const contact = await Contact.create(req.body);
      if (!contact) {
        return response.badRequest(res, "Kontakt yaratishda xatolik");
      }
      return response.created(res, "Kontakt yaratildi", contact);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  // 🔹 2. Barcha kontaktlarni olish (odatda 1 dona bo'ladi)
  async getContacts(req, res) {
    try {
      const contacts = await Contact.find();
      if (contacts.length === 0) {
        return response.notFound(res, "Kontaktlar topilmadi");
      }
      return response.success(res, "Kontaktlar ro'yxati", contacts);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  // 🔹 3. Kontaktni ID orqali olish
  async getContactById(req, res) {
    try {
      const { id } = req.params;
      const contact = await Contact.findById(id);
      if (!contact) {
        return response.notFound(res, "Kontakt topilmadi");
      }
      return response.success(res, "Kontakt ma'lumoti", contact);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  // 🔹 4. Kontaktni yangilash
  async updateContact(req, res) {
    try {
      const { id } = req.params;
      const updated = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updated) {
        return response.notFound(res, "Kontakt topilmadi");
      }
      return response.success(res, "Kontakt yangilandi", updated);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }

  // 🔹 5. Kontaktni o‘chirish
  async deleteContact(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Contact.findByIdAndDelete(id);
      if (!deleted) {
        return response.notFound(res, "Kontakt topilmadi");
      }
      return response.success(res, "Kontakt o'chirildi", deleted);
    } catch (error) {
      return response.serverError(res, error.message);
    }
  }
}

module.exports = new ContactController();
