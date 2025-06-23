import jwt from "jsonwebtoken";
import env from "#configs/env";
import User from "#models/user";

// 🔐 Create Token
export const createToken = (payload, secret = env.JWT_SECRET, options = {}) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: options.expiresIn || "15m",
    ...options,
  });
  return token;
};

// 🎟️ Create and store both Access + Refresh Tokens
export const createAccessOrRefreshToken = async (user_id) => {
  const user = await User.findById(user_id);
  if (!user) throw new Error("User not found");

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken; // make sure `refreshToken` is in schema
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ✅ Verify Token
export const verifyToken = (token, secret = env.JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    // Can differentiate token errors here
    if (err.name === "TokenExpiredError") {
      throw new Error("Token expired, please login again");
    }
    throw new Error("Invalid token, please login again");
  }
};

// 👁️ Decode Token without verifying (useful for logging/debugging)
export const decodeToken = (token) => {
  return jwt.decode(token);
};
