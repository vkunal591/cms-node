import {
    Router
} from "express";
import {
    getUser,
    register,
    login,
    updateUser,
    deleteUser
} from "#controllers/auth";
import {
    authentication
} from "#middlewares/auth";
import {
    permit
} from "#middlewares/permit";

const router = Router();

router.post("/register", permit("create", "/employee"), register);
router.post("/admin/login", permit("create", "/employee"), login);
router.get("/get-current-user", permit("read", "/employee"), getUser);
router.route("/user/:id?")
    .get(permit("read", "/employee"))
    .put(authentication, permit("update", "/employee"), updateUser)
    .delete(authentication, permit("delete", "/employee"), deleteUser);

export default router;