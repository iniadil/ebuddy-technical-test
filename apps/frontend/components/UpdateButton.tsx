"use client";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "@/store/reducers";
import { fetchUserData } from "@/apis/userApi";
import { useState } from "react";
import { auth } from "@/firebase/client";

const UpdateButton = () => {
  const dispatch = useAppDispatch();
  const { loading, user, error, success } = useAppSelector(
    (state) => state.user
  );

  const handleFetch = async () => {
    dispatch(fetchUserStart());
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("No user token");
      const res = await fetchUserData(token);
      dispatch(fetchUserSuccess(res.data));
    } catch (err: any) {
      dispatch(fetchUserFailure(err.message || "Unknown error"));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleFetch}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Fetch User Data"}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      {user && <Typography>{JSON.stringify(user)}</Typography>}
    </>
  );
};

export default UpdateButton;
