import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import { sendErrorResponse, sendResponse } from "../../utils/response";

const createIssues = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user!.id;
    console.log("ID :", reporterId);
    const result = await issuesService.createIssuesIntoDB(req.body, reporterId);
    sendResponse(res, 201, "Issue created successfully", result.rows[0]);
  } catch (error: any) {
    sendErrorResponse(res, 400, error.message);
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
      userRole,
    );

    sendResponse(res, 200, "Issue updated successfully", result);
  } catch (error: any) {
    sendErrorResponse(res, 400, error.message);
  }
};

const deleteIssues = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);
    console.log("Issues ID: ", issueId);

    const userId = req.user.id!;
    const userRole = req.user.role;
    console.log("User :-", userId, userRole);

    if (issueId <= 0) {
      throw new Error("Invalid issue ID");
    }

    const result = await issuesService.deleteIssuesFromDB(
      issueId,
      userId,
      userRole,
    );
    sendResponse(res, 200, "Issue deleted successfully");
  } catch (error: any) {
    sendErrorResponse(res, 403, error.message);
  }
};

const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);
    const userRole = req.user.role;

    if (issueId <= 0) {
      throw new Error("Invalid issue ID");
    }

    const result = await issuesService.updateIssueStatusFromDB(
      issueId,
      req.body.status,
      userRole,
    );

    sendResponse(res, 200, "Issue status updated successfully", result.rows[0]);
  } catch (error: any) {
    sendErrorResponse(res, 403, error.message);
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await issuesService.getSingleIssueFromDB(id);

    sendResponse(res, 200, "Issue retrived successfully", result);
  } catch (error: any) {
    sendErrorResponse(res, 404, error.message);
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDB(req.query);

    sendResponse(res, 200, "Issues retrived successfully", result);
  } catch (error: any) {
    sendErrorResponse(res, 500, "Failed to retrieve issues");
  }
};

export const issuesController = {
  createIssues,
  updateIssue,
  deleteIssues,
  updateIssueStatus,
  getAllIssues,
  getSingleIssue,
};
