import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const userObject = { id, email };
    const token = jwt.sign(userObject, process.env.JWT_KEY, { expiresIn: expiresIn });
    return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies["auth_token"];
    if (!token)
        return res.status(401).json({ message: "Token Not Received" });
    jwt.verify(token, process.env.JWT_KEY, (err: JsonWebTokenError, decoded: JwtPayload) => {
        if (err)
            return res.status(401).json({ message: err.name });
        res.locals.jwtData = decoded;
        next();
    })
};