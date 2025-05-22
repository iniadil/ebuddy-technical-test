"use client";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/client"; // adjust path if needed
import { useRouter } from "next/navigation";
import { registerUser } from "../../apis/userApi";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = user.uid;
      const userObj = {
        uid,
        name,
        email,
        password,
      };

      await registerUser(userObj);
      console.log("User registered successfully:", userObj);
      router.push("/"); // redirect to main page after login
    } catch (error: any) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-credential") {
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
      <form onSubmit={handleRegister}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
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
          {loading ? "Registering you ..." : "Register"}
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
