import { Router } from "express";
import { get, create, update, deleteData } from "#controllers/tabs";
import { authentication } from "#middlewares/auth";
import { permit } from "#middlewares/permit";

const router = Router();

router
.route("/:id?")
  .get(get, permit("read", "/role"))
  .post( create)
  .put(authentication, permit("update", "/tabs"), update)
  .delete(authentication,permit("delete", "/tabs"), deleteData);

export default router;
