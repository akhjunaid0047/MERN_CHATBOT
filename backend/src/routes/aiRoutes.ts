import { Router } from "express";
import { getAiResponse } from "../controllers/aiControllers.js";

const aiRouter = Router();

aiRouter.post("/sendQuery",getAiResponse);

export default aiRouter