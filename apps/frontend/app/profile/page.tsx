"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthUser from "../../hooks/useAuthUser";
import { fetchUserData } from "../../apis/userApi";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthUser();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user === undefined) return; // Still checking auth
    if (user === null) {
      router.replace("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await user.getIdToken();
        const res = await fetchUserData(token);
        setProfile(res.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Error fetching profile"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, router]);

  if (user === undefined || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        pt={8}
        bgcolor="white"
        minHeight={"100vh"}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Paper>
    );
  }
  if (!profile) return null;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        User Profile
      </Typography>
      <Typography>
        <b>Name:</b> {profile.name}
      </Typography>
      <Typography>
        <b>Email:</b> {profile.email}
      </Typography>
      <Typography>
        <b>Age:</b> {profile.age}
      </Typography>
      {/* Display other fields as needed */}
      <Box mt={2}>
        <Button variant="outlined" fullWidth onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </Box>
    </Paper>
  );
}
