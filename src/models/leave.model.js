import mongoose from "mongoose";
import BaseSchema from "#models/base";

const leaveSchema = new BaseSchema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["annual", "sick", "maternity", "paternity", "unpaid", "other"],
    default: "annual",
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "cancelled"],
    default: "pending",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

export default mongoose.model("Leave", leaveSchema);
