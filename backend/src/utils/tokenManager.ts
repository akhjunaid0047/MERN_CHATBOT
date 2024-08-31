import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const userObject = { id, email };
    const token = jwt.sign(userObject, process.env.JWT_KEY, { expiresIn: expiresIn });
    return token;
};