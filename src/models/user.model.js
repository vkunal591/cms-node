import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const employeeSchema = new BaseSchema({
  empId: {
    type: String,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
  },

  mobileNo: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: [
      "intern",
      "trainee",
      "developer",
      "staff",
      "teamleader",
      "hr",
      "salesexecutive",
      "salesmanager",
      "mkexecutive",
      "mkmanager",
      "itexecutive",
      "itmanager",
      "finance",
      "support",
      "admin",
      "superadmin",
    ],
    default: "staff",
  },

  profilePic: {
    type: String,
    file: true,
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },

  dob: {
    type: Date,
  },

  joinDate: {
    type: Date,
    default: Date.now,
  },

  address: {
    street: String,
    city: String,
    landMark: String,
    state: String,
    country: String,
    pincode: String,
  },

  education: [
    {
      degree: String,
      institution: String,
      year: Number,
      grade: String,
    },
  ],

  previousCompanies: [
    {
      companyName: String,
      position: String,
      durationFrom: Date,
      durationTo: Date,
      reasonForLeaving: String,
    },
  ],

  documents: [
    {
      name: String,
      fileUrl: {
        type: String,
        file: true,
      },
      type: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  legalDetails: {
    aadharNo: String,
    panNo: String,
    gstNo: String,
    passportNo: String,
  },

  emergencyContact: {
    name: String,
    relation: String,
    phone: String,
  },

  notificationSettings: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: false,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
  },

  panelSettings: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "light",
    },
    language: {
      type: String,
      default: "en",
    },
    layout: {
      type: String,
      enum: ["compact", "comfortable"],
      default: "comfortable",
    },
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ["active", "on-leave", "terminated", "retired"],
    default: "active",
  },

  // 🔗 References
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],

  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],

  attendanceRecords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
  ],

  leaveRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
    },
  ],

  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

employeeSchema.pre("save", saveFile);

export default mongoose.model("Employee", employeeSchema);
