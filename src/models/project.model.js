import mongoose from "mongoose";
import BaseSchema from "#models/base";

const projectSchema = new BaseSchema({
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
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  deadline: {
    type: Date,
  },
  budget: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["planned", "active", "on-hold", "completed", "cancelled"],
    default: "planned",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  tags: [String],
});

export default mongoose.model("Project", projectSchema);
