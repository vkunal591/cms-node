import { Router } from "express";
import {
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers
} from "#controllers/auth";
import {
  authentication,
  authorization,
  checkPermission
} from "#middlewares/auth";
import { permit } from "#middlewares/permit";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/get-current-user", authentication, getUser);

router.get("/users",  getAllUsers);

router.route("/user/:id")
  .put(authentication, permit("update", "/employee"), updateUser)
  .delete(authentication, permit("delete", "/employee"), deleteUser);

export default router;
