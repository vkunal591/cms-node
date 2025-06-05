import mongoose from "mongoose";
import BaseSchema from "#models/base";

const taskSchema = new BaseSchema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  dueDate: {
    type: Date,
  },
  estimatedHours: {
    type: Number,
  },
  loggedHours: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "blocked", "cancelled"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  attachments: [String], // URLs or file paths
});

export default mongoose.model("Task", taskSchema);
