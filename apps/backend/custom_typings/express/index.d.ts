import { admin } from "../../src/config/firebase";

declare global {
  namespace Express {
    interface Request {
      customProperties: string[];
      authToken?: string | null;
      authId?: string;
      user?: admin.auth.DecodedIdToken;
    }
  }
}
