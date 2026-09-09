import { Router } from "express";
import { issuesController } from "./issue.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/",authMiddleware,issuesController.createIssues);
router.patch("/:id",authMiddleware,issuesController.updateIssue);

export const issuesRoute = router;