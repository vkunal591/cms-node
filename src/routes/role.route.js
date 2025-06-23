import {
  Router
} from "express";
import {
  get,
  create,
  update,
  deleteData
} from "#controllers/role";
import {
  authentication
} from "#middlewares/auth";
import {
  permit
} from "#middlewares/permit";

const router = Router();

router
  .route("/:id?")
  .get(get, permit("read", "/role"))
  .post( create)
  .put(authentication, permit("update", "/role"), update)
  .delete(authentication,permit("delete", "/role"), deleteData);

export default router;