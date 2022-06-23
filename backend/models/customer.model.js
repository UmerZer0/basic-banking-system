const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    accountNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
