import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  brandName: String,
  price: String,
  quantity: Number,
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
