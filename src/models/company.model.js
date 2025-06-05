import mongoose from "mongoose";
import BaseSchema from "#models/base";

const companySchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  contact: {
    phone: String,
    email: { type: String, lowercase: true },
    website: String,
  },
  industry: String,
  size: Number, // number of employees
  founded: Date,
  logoUrl: String,
});

export default mongoose.model("Company", companySchema);
