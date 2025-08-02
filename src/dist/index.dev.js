"use strict";

var _env = _interopRequireDefault(require("#configs/env"));

var _server = _interopRequireDefault(require("#configs/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_server["default"].listen(_env["default"].PORT, function () {
  console.log("Server started on ".concat(_env["default"].PORT));
});