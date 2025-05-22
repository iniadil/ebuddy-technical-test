"use client";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/client"; // adjust path if needed
import { useRouter } from "next/navigation";

const LogicForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect to main page after login
    } catch (error: any) {
      const errorCode = error.code;

      if (
        errorCode === "auth/invalid-credential" ||
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        setErr("Invalid email or password");
      } else {
        setErr(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <form onSubmit={handleLogin}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {err && (
          <Typography color="error" fontSize={14}>
            {err}
          </Typography>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            mt={2}
          >
            Don't have an account?{" "}
            <Button
              onClick={() => router.push("/register")}
              color="primary"
              variant="text"
            >
              Register
            </Button>
          </Typography>
        </div>
      </form>
    </Paper>
  );
};

export default LogicForm;
