import type { Request, Response } from "express";
import { userService } from "./auth.service";

const signupUser = async(req:Request, res:Response) => {
    try {
        console.log("Body", req.body);
        const result = await userService.createUserIntoDB(req.body);
        console.log(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};


const loginUser = async(req:Request, res:Response) => {
    try {
        const result = await userService.loginUserIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }

};
export const userController = {
    signupUser,
    loginUser,
}