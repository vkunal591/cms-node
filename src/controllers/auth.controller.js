import UserService from "#services/auth";
import httpStatus from "#utils/httpStatus";
import asyncHandler from "#utils/asyncHandler";
import {
  sendResponse
} from "#utils/response";
import {
  session
} from "#middlewares/session";
import jwt from "jsonwebtoken";
import env from "#configs/env";

// 🔐 Decode JWT Token
function decodeToken(token) {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    const err = new Error("Token is invalid or expired");
    err.statusCode = httpStatus.UNAUTHORIZED;
    throw err;
  }
}

// 👤 GET single user from token
export const getUser = asyncHandler(async function (req, res, _next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided");

  const decoded = decodeToken(token);
  const user = await UserService.get(decoded.id);
  const {
    password,
    ...userDataWithoutPassword
  } = user._doc;

  sendResponse(httpStatus.OK, res, userDataWithoutPassword, "User fetched successfully");
});

// 👥 GET all users
// No need for ._doc, destructure directly
export const getAllUsers = asyncHandler(async function (req, res, _next) {
  const users = await UserService.get(); // should return plain objects if .lean() is used

  const sanitizedUsers = users?.result?.map(user => {
    const {
      password,
      ...rest
    } = user; // ✅ direct destructure
    return rest;
  });

  sendResponse(httpStatus.OK, res, sanitizedUsers, "Users fetched successfully");
});


// 📝 Register new user
export const register = asyncHandler(async function (req, res, _next) {
  const newUser = await UserService.register(req.body);
  const message = newUser.message || "User created successfully";
  const status = newUser.httpStatus || httpStatus.CREATED;

  const data = {
    token: newUser.token,
    user: newUser.user,
  };

  sendResponse(status, res, data, message);
});

// 🔑 Login
export const login = asyncHandler(async function (req, res, _next) {
  const authData = await UserService.login(req.body);
  const message = authData.message || "Login successful";
  const status = authData.httpStatus || httpStatus.OK;

  sendResponse(status, res, {
    token: authData.token,
    user: authData.user,
  }, message);
});

// 🔧 Update user
export const updateUser = asyncHandler(async function (req, res, _next) {
  const {
    id
  } = req.params;
  const updatedUser = await UserService.update(id, req.body);
  sendResponse(httpStatus.OK, res, updatedUser, "User updated successfully");
});

// ❌ Delete user
export const deleteUser = asyncHandler(async function (req, res, _next) {
  const {
    id
  } = req.params;
  const deletedUser = await UserService.deleteDoc(id);
  sendResponse(httpStatus.OK, res, deletedUser, "User deleted successfully");
});

// 🔒 Role-based authorization middleware
export function authorization(role) {
  return asyncHandler(async function (req, _res, next) {
    const payload = session.get("user");
    if (!payload) throw {
      httpStatus: httpStatus.UNAUTHORIZED,
      message: "Not authenticated"
    };
    if (payload.role === "admin" || payload.role === role) return next();

    throw {
      status: false,
      message: "Operation not permitted",
      httpStatus: httpStatus.FORBIDDEN,
    };
  });
}