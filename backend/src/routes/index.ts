import { Router } from "express";
import userRoutes from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";
import aiRouter from "./aiRoutes.js";

const appRouter = Router();

appRouter.use("/user",userRoutes);
appRouter.use("/chats",chatRoutes);
appRouter.use("/ai",aiRouter);
export default appRouter;