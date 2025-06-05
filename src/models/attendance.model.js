import mongoose from "mongoose";
import BaseSchema from "#models/base";

const attendanceSchema = new BaseSchema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "leave", "remote", "half-day"],
    required: true,
  },
  checkInTime: Date,
  checkOutTime: Date,
  workingHours: Number,
  notes: String,
});

export default mongoose.model("Attendance", attendanceSchema);
