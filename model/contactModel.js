const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    salesDepartment: {
      // Отдел по продажам
      type: String,
      required: true,
    },
    exportDepartment: {
      // Отдел сбыта по вопросам экспорта
      type: String,
      required: true,
    },
    purchaseDepartment: {
      // Отдел по закупу
      type: String,
      required: true,
    },
    turkeyBranch: {
      // Филиал в Турции
      type: String,
      required: true,
    },
    // infoDesk: {
    //   // Справочное бюро
    //   type: String,
    //   required: true,
    // },
    // reception: {
    //   // Приёмная
    //   type: String,
    //   required: true,
    // },
    telegramLink: {
      type: String, // Masalan: https://t.me/yourcompany
    },
    whatsappLink: {
      type: String, // Masalan: https://wa.me/998901234567
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contact", ContactSchema);
