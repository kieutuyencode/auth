import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  laces: String,
  mesh: String,
  caps: String,
  inner: String,
  sole: String,
  stripes: String,
  band: String,
  patch: String,
  time: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", userSchema);

export default Cart;
