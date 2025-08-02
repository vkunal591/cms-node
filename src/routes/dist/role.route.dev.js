"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _role = require("#controllers/role");

var _auth = require("#middlewares/auth");

var _permit = require("#middlewares/permit");

var router = (0, _express.Router)();
router.route("/:id?").get(_role.get).post(_role.create).put(_auth.authentication, (0, _permit.permit)("update", "/role"), _role.update)["delete"](_auth.authentication, (0, _permit.permit)("delete", "/role"), _role.deleteData);
var _default = router;
exports["default"] = _default;