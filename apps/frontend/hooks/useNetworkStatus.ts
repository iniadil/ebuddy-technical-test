// hooks/useNetworkStatus.ts
import { useState, useEffect } from "react";

/**
 * A hook that tracks the browser's online/offline status
 * @returns Object with isOnline status and a checkConnection function
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Function to actively check connection by making a small request
  const checkConnection = async (): Promise<boolean> => {
    // Try to fetch a small file to check actual connectivity
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Add a cache-busting parameter to prevent caching
      const response = await fetch("/favicon.ico?_=" + new Date().getTime(), {
        method: "HEAD",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const online = response.ok;
      setIsOnline(online);
      return online;
    } catch (error) {
      setIsOnline(false);
      return false;
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Verify the connection is actually working
      checkConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Do an initial check when the hook mounts
    checkConnection();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, checkConnection };
}
