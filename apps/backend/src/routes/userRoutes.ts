import { Router } from "express";
import {
  updateUserData,
  fetchUserData,
  registerUser,
} from "../controller/userController";
import { checkIfAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/update-user-data", checkIfAuthenticated, updateUserData);
router.post("/register-user", registerUser);
router.get("/fetch-user-data", checkIfAuthenticated, fetchUserData);

export default router;
