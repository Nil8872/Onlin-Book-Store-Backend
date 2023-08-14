const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  bookId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  }
,
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart
