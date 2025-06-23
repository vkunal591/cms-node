import {
  Router
} from "express";
import {
  get,
  create,
  update,
  deleteData
} from "#controllers/permission";
import {
  authentication,
  checkPermission
} from "#middlewares/auth";
import {
  authorization
} from "#controllers/auth";

const router = Router();

router
  .route("/:id?")
  .get(get,authorization("Super Admin"))
  .post(authentication, authorization("Super Admin"), checkPermission("create", "/permission"), create)
  .put(authentication, update)
  .delete(authentication, deleteData);

export default router;