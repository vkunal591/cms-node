// import User from "#models/user";
// import { verifyToken } from "#utils/jwt";
// import httpStatus from "#utils/httpStatus";
// import { session } from "#middlewares/session";
// import asyncHandler from "#utils/asyncHandler";
// import jwt from "jsonwebtoken";
// import env from "#configs/env";
// import Employee from "#models/user"; // adjust to your actual path

// export const ADMIN = "admin";

// // export async function authentication(req, res, next) {
// //   try {
// //     const token = req.headers["authorization"]?.split(" ")[1];
// //     if (!token) {
// //       throw {
// //         status: false,
// //         httpStatus: httpStatus.UNAUTHORIZED,
// //         message: "Invalid token please login again",
// //       };
// //     }
// //     const payload = verifyToken(token);
// //     let user = await User.findById(payload.id)
// //       .populate("role", "name permissions")
// //       .select("name mobileNo email role profilePic mobileNo");
// //     if (!user) {
// //       throw {
// //         status: false,
// //         httpStatus: httpStatus.UNAUTHORIZED,
// //         message: "User doesn't exist",
// //       };
// //     }
// //     user = user.toJSON();
// //     user.permissions = user.role.permissions;
// //     user.role = user.role;
// //     delete user.password;

// //     req.user = user;
// //     // session.set("user", user);
// //     // session.set("payload", payload);
// //     next();
// //   } catch (err) {
// //     next(err);
// //   }
// // }


// export const authentication = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, env.JWT_SECRET);

//     const user = await Employee.findById(decoded.id)
//       .populate({
//         path: "role",
//         populate: { path: "permissions tabs" },
//       });

//     if (!user || !user.isActive) {
//       return res.status(403).json({ error: "Unauthorized" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };


// export function authorization(role) {
//   return asyncHandler(async function (req, _res, next) {
//     const payload = session.get("user");
//     if (payload.role === ADMIN) return next();
//     // role = user
//     if (role !== payload.role) {
//       throw {
//         status: false,
//         message: "Operation not permitted",
//         httpStatus: httpStatus.FORBIDDEN,
//       };
//     }
//     next();
//   });
// }
















// File: middlewares/auth.js

import jwt from "jsonwebtoken";
import env from "#configs/env";
import httpStatus from "#utils/httpStatus";
import asyncHandler from "#utils/asyncHandler";
import Employee from "#models/user"; // Adjust path if needed

export const ADMIN = "admin";

/**
 * Middleware to authenticate JWT and populate user with role, permissions and tabs
 */
export const authentication = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: false,
      message: "Invalid token",
    });
  }
  const user = await Employee.findById(decoded.id)
    .select("-password")
    .populate({
      path: "role",
      populate: {
        path: "access.tab",
        model: "Tabs"
      }
    });

  if (!user || !user.isActive) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: false,
      message: "Unauthorized or inactive user",
    });
  }

  req.user = user;
  next();
});

/**
 * Middleware to allow only specific roles
 * @param {string} roleName
 */
export const authorization = (roleName) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;

    if (!user?.role?.name) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: false,
        message: "Role not assigned",
      });
    }

    if (user.role.name === ADMIN || user.role.name === roleName) {
      return next();
    }

    return res.status(httpStatus.FORBIDDEN).json({
      status: false,
      message: "Operation not permitted",
    });
  });

/**
 * Middleware to check tab-specific permission (e.g. 'users', 'create')
 * @param {string} tabName
 * @param {string} permissionName
 */
export const checkPermission = (tabName, permissionName) =>
  asyncHandler(async (req, res, next) => {
    const role = req.user.role;

    const tabAccess = role.tabs.find((t) => t.name === tabName);
    if (!tabAccess) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: false,
        message: `No access to tab '${tabName}'`,
      });
    }

    const hasPermission = tabAccess.permissions.some(
      (perm) => perm.name === permissionName
    );

    if (!hasPermission) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: false,
        message: `Missing '${permissionName}' permission on tab '${tabName}'`,
      });
    }

    next();
  });