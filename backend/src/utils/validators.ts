import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const error = validationResult(req);
        if (error.isEmpty()) return next();
        else return res.status(422).json({ errors: error.array() });
    };
};

export const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().trim().isEmail().withMessage("Enter a valid Email"),
    body("password").notEmpty().trim().isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
];