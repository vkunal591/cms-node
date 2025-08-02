import User from "#models/user";
import Service from "#services/base";
import bcrypt from "bcryptjs";
import httpStatus from "#utils/httpStatus";
import {
  createAccessOrRefreshToken
} from "#utils/jwt";

class UserService extends Service {
  static Model = User;

  // 🚀 Register New User
  static async register(data) {
    const {
      name,
      email,
      mobileNo,
      password,
      role,
      empId,
      profilePic,
      company,
      department,
      branch,
      gender,
      dob,
      joinDate,
      address,
      education,
      previousCompanies,
      documents,
      legalDetails,
      emergencyContact,
      notificationSettings,
      panelSettings,
    } = data;

    // ⚠️ Check if user already exists
    const existingUser = await this.Model.findOne({
      $or: [{
        mobileNo
      }, {
        email
      }, {
        empId
      }],
    });

    if (existingUser) {
      return {
        httpStatus: httpStatus.CONFLICT,
        message: "User already exists",
      };
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 📦 Create new user
    const user = new this.Model({
      empId,
      name,
      email,
      mobileNo,
      password: hashedPassword,
      role,
      profilePic,
      company,
      department,
      branch,
      gender,
      dob,
      joinDate,
      address,
      education,
      previousCompanies,
      documents,
      legalDetails,
      emergencyContact,
      notificationSettings,
      panelSettings,
    });

    await user.save();

    // 🔑 Generate tokens
    const {
      accessToken,
      refreshToken
    } = await createAccessOrRefreshToken(user._id);

    // 📤 Clean user data
    const userData = user.toObject();
    delete userData.password;
    userData.role = await user.populate({
      path: "role",
      populate: {
        path: "access.tab", // populate each `tab` inside `access`
        model: "Tabs"
      }
    });

    return {
      accessToken,
      refreshToken,
      user: userData,
    };
  }

  // 🔐 Login Existing User
static async login(data) {
  const { mobileNo, email, empId, password } = data;

  // 🧍‍♂️ Find user by any identifier
  const user = await this.Model.findOne({
    $or: [
      { mobileNo },
      { email },
      { empId }
    ]
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      httpStatus: httpStatus.UNAUTHORIZED,
      message: "Invalid credentials",
    };
  }

  // 🔑 Generate tokens
  const { accessToken, refreshToken } = await createAccessOrRefreshToken(user._id);

  // 🌐 Populate role -> access.tab (permissions are enum strings and don't need populate)
  await user.populate({
    path: "role",
    populate: {
      path: "access.tab",
      model: "Tabs"
    }
  });

  // 📤 Prepare user object without password
  const userData = user.toObject();
  delete userData.password;

  return {
    httpStatus: httpStatus.OK,
    message: "Login successful",
    accessToken,
    refreshToken,
    user: userData,
  };
}

}

export default UserService;