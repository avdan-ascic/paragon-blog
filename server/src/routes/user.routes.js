import express from "express";
import passport from "passport";

import userCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/api/users/create").post(userCtrl.create);
router.route("/api/users/login").post(userCtrl.login);
router
  .route("/api/users/is-authenticated")
  .get(passport.authenticate("jwt"), userCtrl.isAuthenticated);
router
  .route("/api/users/logout")
  .get(passport.authenticate("jwt"), userCtrl.logout);
router
  .route("/api/users/:id")
  .get(userCtrl.readById)
  .put(passport.authenticate("jwt"), userCtrl.update);

export default router;
