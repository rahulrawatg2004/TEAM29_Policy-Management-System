const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ["Life", "Health", "Vehicle"] },
  basePremium: Number,
  terms: String
})

module.exports = mongoose.model("Product", productSchema)
