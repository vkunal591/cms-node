"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _base = _interopRequireDefault(require("#models/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var permissionSchema = new _base["default"]({
  name: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  action: {
    type: [String],
    "enum": ["read", "create", "update", "delete"],
    required: true
  }
});

var _default = _mongoose["default"].model("Permission", permissionSchema);

exports["default"] = _default;