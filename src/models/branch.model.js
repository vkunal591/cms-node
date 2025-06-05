import mongoose from "mongoose";
import BaseSchema from "#models/base";

const branchSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  phone: String,
  email: {
    type: String,
    lowercase: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  }, // branch head
});

export default mongoose.model("Branch", branchSchema);
