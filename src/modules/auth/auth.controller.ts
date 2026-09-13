import type { Request, Response } from "express";
import { userService } from "./auth.service";
import { sendErrorResponse, sendResponse } from "../../utils/response";

const signupUser = async (req: Request, res: Response) => {
  try {
    console.log("Body", req.body);
    const result = await userService.createUserIntoDB(req.body);
    console.log(req.body);
    sendResponse(res, 201, "User registered successfully", result.rows[0]);
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUserIntoDB(req.body);
    sendResponse(res, 200, "Login successful", result);
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message);
  }
};
export const userController = {
  signupUser,
  loginUser,
};
