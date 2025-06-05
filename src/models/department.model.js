import mongoose from "mongoose";
import BaseSchema from "#models/base";

const departmentSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // department head
  },
  location: {
    type: String,
  },
});

export default mongoose.model("Department", departmentSchema);
