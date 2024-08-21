import { Router } from "express";
import { getAllUsers, loginUser, signUpUser } from "../controllers/userController.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signUpValidator),signUpUser);
userRoutes.post("/login",validate(loginValidator),loginUser)

export default userRoutes;