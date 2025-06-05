import mongoose from "mongoose";
import BaseSchema from "#models/base";

const notificationSchema = new BaseSchema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["info", "warning", "alert", "task", "system"],
    default: "info",
  },
  link: {
    type: String, // URL or route to navigate on click
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
