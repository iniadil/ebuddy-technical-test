import admin from "firebase-admin";
import serviceAccount from "../../ebuddy-admin-sdk.json"; // Adjust path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

export { admin, db };
