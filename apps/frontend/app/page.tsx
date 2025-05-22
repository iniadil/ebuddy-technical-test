"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Box, Button, Modal, Typography } from "@mui/material";
import { fetchUserData } from "../apis/userApi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/client";
import OnlineStatus from "../components/molecules/OnlineStatus";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const user = useAuthUser();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const _getData = async () => {
    const token = await user?.getIdTokenResult()?.then((res) => res.token);
    console.log(token, "THE TOKEN");
    const res = await fetchUserData(token as string);
    console.log(res.data);
    setUserData(res.data);
    setOpen(true);
  };

  const _signOut = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  useEffect(() => {
    if (user === null) {
      // User not logged in
      router.replace("/login");
    }
  }, [user, router]);

  if (user === undefined) {
    // Auth loading
    return (
      <div className="flex w-full min-h-screen bg-white items-center justify-center text-black">
        waiting for authentication...
      </div>
    );
  }
  if (user === null) {
    // (Redirecting to login)
    return null;
  }

  // User is authenticated, render the main content:
  return (
    <>
      <OnlineStatus />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={true}
      >
        <div className="flex items-center justify-center bg-black/50 min-h-screen">
          <div className="bg-white p-5 rounded-xl w-1/2 flex justify-center flex-col">
            <table className="w-full mt-4 text-black">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                    UID
                  </th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">
                    Password
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData && (
                  <tr>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {userData.uid}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {userData.name}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {userData.password}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex-1 mt-5 text-left">
              <blockquote className="text-center text-xs font-semibold text-black">
                {userData
                  ? `User Data: ${JSON.stringify(userData)}`
                  : "Loading..."}
              </blockquote>
            </div>
            <div className="mx-auto mt-10">
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                className="mt-4 mx-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-md w-full p-8 text-center">
          <img
            src="/images/avatar.jpeg"
            alt="Profile"
            className="mx-auto rounded-full w-32 h-32 object-cover mb-6 border-4 border-blue-500"
          />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Muhammad Adil
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            Full Stack Developer | React Native/Expo | AI Enthusiast | AWS Cloud
            | Teacher at PPAIA
          </p>
          <div className="flex justify-center space-x-6 text-blue-600">
            <a
              href="mailto:ivgcomunity@gmail.com"
              className="hover:underline"
              aria-label="Email me"
            >
              Email
            </a>
            <a
              href="https://github.com/iniadil"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
              aria-label="Adil's Github profile"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/adil-muhammad-562722276/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
              aria-label="Adil's LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <Button onClick={_getData}>Get Data</Button>
            <Button onClick={_signOut} variant="contained" color="error">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
