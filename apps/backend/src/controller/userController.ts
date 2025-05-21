import { Request, Response } from "express";
import { db } from "../config/firebase";
import { User } from "shared/user";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Update user data
export async function updateUserData(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ message: "Unauthorized: User ID is required" });
      return;
    }
    const { name, email, age } = req.body as User;

    const userObj: User = { uid, name, email, age };

    await db.collection("USERS").doc(uid).set(userObj, { merge: true });
    res.json({ message: "User data updated", user: userObj });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Fetch user data
export async function fetchUserData(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ message: "Unauthorized: User ID is required" });
      return;
    }
    const userDoc = await db.collection("USERS").doc(uid).get();

    if (!userDoc.exists) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(userDoc.data());
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
