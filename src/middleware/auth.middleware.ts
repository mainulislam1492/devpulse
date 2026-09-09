import type { Request, Response, NextFunction  } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const authMiddleware  = (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            config.secret as string 
        ) as {
            id: number;
            email: string;
            role: string;
        };

        req.user = decoded;

        next();

    } 
    catch(error : any) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};