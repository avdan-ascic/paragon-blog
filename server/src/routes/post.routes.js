import express from "express";
import passport from "passport";

import postCtrl from "../controllers/post.controller";

const router = express.Router();

router
  .route("/api/posts/create")
  .post(passport.authenticate("jwt"), postCtrl.create);
router.route("/api/posts/read-all").get(postCtrl.readAll);
router
  .route("/api/posts/comment/:id")
  .put(passport.authenticate("jwt"), postCtrl.comment);
router.route("/api/posts/search").post(postCtrl.search);
router
  .route("/api/posts/:id")
  .get(postCtrl.readById)
  .put(passport.authenticate("jwt"), postCtrl.update)
  .delete(passport.authenticate("jwt"), postCtrl.remove);

export default router;
