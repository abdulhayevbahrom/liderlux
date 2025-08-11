const { Schema, model } = require("mongoose");

const multiLangString = {
  uz: { type: String, default: "" },
  ru: { type: String, default: "" },
  en: { type: String, default: "" },
};

const ProductSchema = new Schema(
  {
    title: multiLangString, // sarlavha 3 tilda
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: String,
      default: 0,
    },
    applicationAreas: multiLangString, // qo‘llanish sohalari
    usageMethod: multiLangString, // qo‘llash usuli
    safetyRequirements: multiLangString, // xavfsizlik talablar
    storageAndTransport: multiLangString, // saqlash va tashish
    manufacturerWarranty: multiLangString, // kafolat
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
