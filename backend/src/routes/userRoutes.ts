import { Router } from "express";
import { getAllUsers, loginUser, signUpUser, userLogout, verifyUser } from "../controllers/userController.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/tokenManager.js";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signUpValidator),signUpUser);
userRoutes.post("/login",validate(loginValidator),loginUser)
userRoutes.post("/authenticate",verifyToken,verifyUser);
userRoutes.post("/logout",verifyToken,userLogout);

export default userRoutes;