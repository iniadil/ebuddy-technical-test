import { Request, Response } from "express";
import { db, admin } from "../config/firebase";
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

    const userObj: User = { uid, name, email, age, password: "" }; // Password is not updated here

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

    console.log("Fetching user data for UID:", uid);

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

// Register user
export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, uid } = req.body as User;

    console.log("Registering user:", { name, email, password });

    // Check if user already exists
    const existingUser = await db
      .collection("USERS")
      .where("email", "==", email)
      .get();

    if (!existingUser.empty) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    if (!uid) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
    // Create user object
    const userObj: User = { uid, name, email, age: 0, password }; // Default age to 0 or any other default value
    // Store user data in Firestore
    await db.collection("USERS").doc(uid).set(userObj);
    res.status(201).json({ message: "User registered", user: userObj });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
