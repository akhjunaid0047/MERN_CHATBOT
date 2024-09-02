import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { deleteChats } from "../controllers/chatControllers.js";

const chatRoutes = Router();

chatRoutes.get("/delete",verifyToken,deleteChats);

export default chatRoutes;