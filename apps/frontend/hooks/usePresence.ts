// hooks/usePresence.ts
import { database as db } from "../firebase/client";
import {
  ref,
  onDisconnect,
  set,
  serverTimestamp,
  onValue,
  get,
} from "firebase/database";
import { useEffect } from "react";
import { User } from "firebase/auth"; // or your user type

export function usePresence(user: User | null) {
  useEffect(() => {
    if (!user) return;

    // Don't try to set presence if we're offline
    if (!navigator.onLine) return;

    const userStatusRef = ref(db, `/status/${user.uid}`);
    const connectedRef = ref(db, ".info/connected");

    // Monitor connection to Firebase
    const unsubscribe = onValue(
      connectedRef,
      (snapshot) => {
        // Only update status if we're actually connected to Firebase
        if (snapshot.val() === true) {
          // Set as online when connected
          set(userStatusRef, {
            state: "online",
            last_changed: serverTimestamp(),
          }).catch((error) =>
            console.error("Error setting online status:", error)
          );

          // Set as offline when disconnected (browser close, connection lost, etc)
          onDisconnect(userStatusRef)
            .set({
              state: "offline",
              last_changed: serverTimestamp(),
            })
            .catch((error) =>
              console.error("Error setting disconnect handler:", error)
            );
        }
      },
      (error) => {
        console.error("Error monitoring connection status:", error);
      }
    );

    // (Optional) On unmount, set offline and cleanup
    return () => {
      unsubscribe();
      // Only try to set offline status if we're actually online
      if (navigator.onLine) {
        set(userStatusRef, {
          state: "offline",
          last_changed: serverTimestamp(),
        }).catch((error) =>
          console.error("Error setting offline status on unmount:", error)
        );
      }
    };
  }, [user]);
}
