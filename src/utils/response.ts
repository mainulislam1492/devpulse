import type { Response } from "express";

export const sendResponse = (res: Response,statusCode: number,message: string,data: unknown = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};