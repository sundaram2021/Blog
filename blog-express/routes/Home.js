import { Router } from "express";
import { HomeGet } from "../controllers/HomeController.js";
import {
  getBlog,
  getUserBlogs,
  getData,
  getBlogData,
  postLikeData,
  postSaveData,
  postComment,
  deleteArticle,
  deleteComment,
} from "../controllers/BlogController.js";
const router2 = Router();

router2.get("/", HomeGet);
router2.get("/yourblogs", getUserBlogs);
router2.post("/blog", getBlog);
router2.get("/getdata", getData);
router2.get("/getdata/:id", getBlogData);
router2.post("/postlike", postLikeData);
router2.post("/postsave", postSaveData);
router2.post("/postcomment", postComment);
router2.delete("/deletearticles/:id", deleteArticle);
router2.delete("/api/blog/:blogId/comment/:commentId", deleteComment);

export default router2;
