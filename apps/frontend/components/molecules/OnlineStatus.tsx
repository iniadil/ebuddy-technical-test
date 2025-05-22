import React, { useState, useEffect } from "react";
import { usePresence } from "../../hooks/usePresence";
import useAuthUser from "../../hooks/useAuthUser";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { cx } from "../../utils/cx";
import { ref, onValue, set, serverTimestamp } from "firebase/database";
import { database } from "../../firebase/client";

type OnlineStatusProps = {};

type StatusType = "online" | "offline" | "loading";

const OnlineStatus: React.FC<OnlineStatusProps> = () => {
  const user = useAuthUser();
  const [status, setStatus] = useState<StatusType>("loading");
  const { isOnline: isNetworkConnected, checkConnection } = useNetworkStatus();

  // Set up presence - the hook itself will handle the null user case
  usePresence(user ?? null);

  // Check connection when component mounts and at regular intervals
  useEffect(() => {
    // Check connection on page load
    checkConnection();

    // Periodically check connection
    const intervalId = setInterval(() => {
      checkConnection();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [checkConnection]);

  // Listen to the user's status in Firebase
  useEffect(() => {
    if (!user?.uid) {
      setStatus("offline");
      return;
    }

    // If we know we're offline, don't even try to connect to Firebase
    if (!isNetworkConnected) {
      setStatus("offline");
      return;
    }

    const userStatusRef = ref(database, `/status/${user.uid}`);

    const unsubscribe = onValue(
      userStatusRef,
      (snapshot) => {
        if (snapshot.exists() && isNetworkConnected) {
          const data = snapshot.val();
          setStatus(data.state as StatusType);
        } else {
          setStatus("offline");
        }
      },
      (error) => {
        // Handle Firebase connection error
        console.error("Firebase connection error:", error);
        setStatus("offline");
        // If we get an error, double-check our connectivity
        checkConnection();
      }
    );

    return () => unsubscribe();
  }, [user, isNetworkConnected, checkConnection]);

  return (
    <div className="fixed bottom-5 right-5">
      <div className="flex items-center justify-center bg-white rounded-full shadow-lg p-3">
        <div
          className={cx(
            `w-3 h-3 rounded-full`,
            status === "online"
              ? "bg-green-500 animate-pulse"
              : status === "offline"
                ? "bg-gray-500"
                : "bg-yellow-500 animate-pulse"
          )}
        ></div>
        <span className="ml-2 text-sm text-gray-700">
          {status === "loading"
            ? "Connecting..."
            : status === "online"
              ? "Online"
              : "Offline"}
        </span>
      </div>
    </div>
  );
};
export default OnlineStatus;
