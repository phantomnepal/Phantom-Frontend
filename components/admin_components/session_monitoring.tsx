"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios/axios-server";

export default function SessionMonitor() {
  const router = useRouter();

  const isChecking = useRef(false);

  useEffect(() => {
    const checkSession = async () => {
      if (isChecking.current) return;

      isChecking.current = true;

      try {
        // Request Next.js BFF session endpoint
        const response = await api.get("/api/auth/session/");

        // Session is valid
        if (response.data.authenticated) {
          return;
        }

      } catch (error: any) {

        // Refresh token expired or invalid
        if (error.response?.status === 401) {
          router.replace("/admin/login");
          router.refresh();
          return;
        }

        // Backend or network error
        console.error("Session check failed:", error);
        toast.error("Unable to verify session. Please try again later.");

      } finally {
        isChecking.current = false;
      }
    };

    // Check every 60 seconds
    const interval = window.setInterval(
      checkSession,
      60 * 1000
    );

    // Check when browser tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };

  }, [router]);

  return null;
}