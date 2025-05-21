import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebase";

// We will use the Request type directly since we've extended it in custom_typings
export type AuthenticatedRequest = Request;

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAuthToken(req, res, async () => {
    if (req.authToken) {
      try {
        const { authToken } = req;
        const userInfo = await admin.auth().verifyIdToken(authToken);
        req.user = userInfo;
        req.authId = userInfo.uid;
        return next();
      } catch (e) {
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request" });
      }
    } else {
      return res
        .status(401)
        .send({ error: "Authentication token is required" });
    }
  });
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAuthToken(req, res, async () => {
    if (req.authToken) {
      try {
        const userInfo = await admin.auth().verifyIdToken(req.authToken);
        if (userInfo.admin === true) {
          req.user = userInfo;
          req.authId = userInfo.uid;
          return next();
        } else {
          return res
            .status(403)
            .send({ error: "You do not have admin privileges" });
        }
      } catch (e) {
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request" });
      }
    } else {
      return res
        .status(401)
        .send({ error: "Authentication token is required" });
    }
  });
};
