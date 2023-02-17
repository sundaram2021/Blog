import { Router } from "express";
import { HomeGet } from '../controllers/HomeController.js'
import { getBlog, getData, getBlogData } from "../controllers/BlogController.js";
const router2 = Router();

router2.get('/', HomeGet)

router2.post("/blog", getBlog)
router2.get("/getdata", getData)
router2.get("/getdata/:id", getBlogData)

export default router2;