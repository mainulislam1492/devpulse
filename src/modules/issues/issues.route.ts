import { Router } from "express";
import { issuesController } from "./issue.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/",authMiddleware,issuesController.createIssues);
router.patch("/:id",authMiddleware,issuesController.updateIssue);
router.delete("/:id",authMiddleware,issuesController.deleteIssues);
router.patch("/:id/status",authMiddleware,issuesController.updateIssueStatus);
// router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getSingleIssue);

export const issuesRoute = router;