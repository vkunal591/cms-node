"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _base = _interopRequireDefault(require("#models/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var roleSchema = new _base["default"]({
  name: {
    type: String,
    required: true,
    unique: true
  },
  access: [{
    _id: false,
    tab: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Tabs",
      required: true
    },
    permissions: [{
      type: [String],
      "enum": ["read", "create", "update", "delete"],
      required: true
    }]
  }]
});

var _default = _mongoose["default"].model("Role", roleSchema);

exports["default"] = _default;