"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("#configs/env"));

var _base = _interopRequireDefault(require("#models/base"));

var _uploadFile = require("#utils/uploadFile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var employeeSchema = new _base["default"]({
  empId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Role"
  },
  profilePic: {
    type: String,
    file: true
  },
  gender: {
    type: String,
    "enum": ["male", "female", "other"]
  },
  dob: {
    type: Date
  },
  joinDate: {
    type: Date,
    "default": Date.now
  },
  address: {
    street: String,
    city: String,
    landMark: String,
    state: String,
    country: String,
    pincode: String
  },
  education: [{
    degree: String,
    institution: String,
    year: Number,
    grade: String
  }],
  previousCompanies: [{
    companyName: String,
    position: String,
    durationFrom: Date,
    durationTo: Date,
    reasonForLeaving: String
  }],
  documents: [{
    name: String,
    fileUrl: {
      type: String,
      file: true
    },
    type: String,
    uploadedAt: {
      type: Date,
      "default": Date.now
    }
  }],
  legalDetails: {
    aadharNo: String,
    panNo: String,
    gstNo: String,
    passportNo: String
  },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  notificationSettings: {
    emailNotifications: {
      type: Boolean,
      "default": true
    },
    smsNotifications: {
      type: Boolean,
      "default": false
    },
    pushNotifications: {
      type: Boolean,
      "default": true
    }
  },
  panelSettings: {
    theme: {
      type: String,
      "enum": ["light", "dark", "system"],
      "default": "light"
    },
    language: {
      type: String,
      "default": "en"
    },
    layout: {
      type: String,
      "enum": ["compact", "comfortable"],
      "default": "comfortable"
    }
  },
  isActive: {
    type: Boolean,
    "default": true
  },
  status: {
    type: String,
    "enum": ["active", "on-leave", "terminated", "retired"],
    "default": "active"
  },
  // 🔗 References
  company: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Company"
  },
  department: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Department"
  },
  branch: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Branch"
  },
  projects: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Project"
  }],
  tasks: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Task"
  }],
  attendanceRecords: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Attendance"
  }],
  leaveRequests: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Leave"
  }],
  notifications: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Notification"
  }],
  refreshToken: {
    type: String
  }
}); // 🔐 JWT Method for Access Token

employeeSchema.methods.generateAccessToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id,
    role: this.role
  }, _env["default"].JWT_SECRET, {
    expiresIn: _env["default"].JWT_ACCESS_EXPIRES || "15m"
  });
}; // 🔐 JWT Method for Refresh Token


employeeSchema.methods.generateRefreshToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id
  }, _env["default"].JWT_SECRET, {
    expiresIn: _env["default"].JWT_REFRESH_EXPIRES_IN || "7d"
  });
}; // 📦 File Upload Hook


employeeSchema.pre("save", _uploadFile.saveFile);

var _default = _mongoose["default"].model("Employee", employeeSchema);

exports["default"] = _default;