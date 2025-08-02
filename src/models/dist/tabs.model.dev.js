"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _base = _interopRequireDefault(require("#models/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tabsSchema = new _base["default"]({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  subtabs: [{
    name: {
      type: String
    },
    icon: {
      type: String
    },
    route: {
      type: String,
      required: true
    }
  }]
});

var _default = _mongoose["default"].model("Tabs", tabsSchema);

exports["default"] = _default;