import express  from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessage, getUserForSidebar } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", protectRoute ,getUserForSidebar)
router.get("/:id", protectRoute ,getMessage)
router.post("/send/:id", protectRoute ,sendMessage)

export default router;

//예를 들어 "/conversations" route가 "/:id" route 보다 순서상으로 밑에 있으면 getMessage()가
//실행되고 빈 []가 반환된다.