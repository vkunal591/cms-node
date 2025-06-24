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
  authentication,
  authorization,
  checkPermission
} from "#middlewares/auth";
import {
  permit
} from "#middlewares/permit";

const router = Router();

router
  .route("/:id?")
  .get(authentication, authorization("Super Admin"), checkPermission("create", "/permission"), get)
  .post(create)
  .put(authentication, permit("update", "/role"), update)
  .delete(authentication, permit("delete", "/role"), deleteData);

export default router;