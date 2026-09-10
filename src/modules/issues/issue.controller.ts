import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async(req:Request, res:Response) => {
    try {
        const reporterId = req.user!.id;
        console.log("ID :", reporterId);
        const result = await issuesService.createIssuesIntoDB(req.body, reporterId);
        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: result.rows[0],
        });
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
  
};

const updateIssue = async (req: Request, res: Response) => {
    try {
        const issueId = Number(req.params.id);

        const userId = req.user.id!;
        const userRole = req.user.role;
        console.log("USER ID:", userId);
        console.log("USER ROLE:", userRole);

        const result = await issuesService.updateIssueIntoDB(
            issueId,
            req.body,
            userId,
            userRole
        );

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteIssues = async(req:Request, res:Response) => {
    try {
        const issueId = Number(req.params.id);
        console.log("Issues ID: ",issueId);

        const userId = req.user.id!;
        const userRole = req.user.role;
        console.log("User :-", userId, userRole);

        if(issueId <= 0) {
           throw new Error('Invalid issue ID');
        }

        const result = await issuesService.deleteIssuesFromDB(issueId, userId, userRole);
        res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
        });
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const updateIssueStatus = async (req: Request, res: Response) => {
    try {
        const issueId = Number(req.params.id);
        const userRole = req.user.role;

        if (issueId <= 0) {
            throw new Error("Invalid issue ID");
        }

        const result = await issuesService.updateIssueStatusFromDB(issueId,req.body.status,userRole);

        res.status(200).json({
            success: true,
            message: "Issue status updated successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const issuesController = {
    createIssues,
    updateIssue,
    deleteIssues,
    updateIssueStatus,
};