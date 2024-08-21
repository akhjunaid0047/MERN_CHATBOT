import { Router } from "express";
import { getAllUsers, signUpUser } from "../controllers/userController.js";
import { signUpValidator, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signUpValidator),signUpUser);

export default userRoutes;