import { Router } from "express";
import { userController } from "./auth.controller";

const router = Router();

router.post("/signup", userController.signupUser);
router.post("/login",);
export const authRoute = router;