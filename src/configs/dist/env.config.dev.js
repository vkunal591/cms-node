"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _envalid = require("envalid");

(0, _dotenv.configDotenv)();
var env = (0, _envalid.cleanEnv)(process.env, {
  PORT: (0, _envalid.num)({
    "default": 5000
  }),
  JWT_SECRET: (0, _envalid.str)(),
  DB_URI: (0, _envalid.str)(),
  JWT_ACCESS_EXPIRES: (0, _envalid.str)(),
  JWT_REFRESH_EXPIRES_IN: (0, _envalid.str)()
});
var _default = env;
exports["default"] = _default;