import User from "#models/user";
import Service from "#services/base";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "#utils/httpStatus";

class UserService extends Service {
  static Model = User;

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
    const existingUser = await this.Model.findOne({
      $or: [{ mobileNo }, { email }, { empId }],
    });

    if (existingUser) {
      return {
        httpStatus: httpStatus.CONFLICT,
        message: "User already exists",
      };
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
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
    console.log(user)

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = user.toObject();
    delete userData.password;

    return {
      token,
      user: userData,
    };
  }

  static async login(data) {
    const { mobileNo, email, empId, password } = data;

    const user = await this.Model.findOne({
      $or: [{ mobileNo }, { email }, { empId }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        httpStatus: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = user.toObject();
    delete userData.password;

    return {
      token,
      user: userData,
    };
  }
}

export default UserService;
