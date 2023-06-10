import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profilee";

export default function Routers() {
  const { username } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {username ? (
        <Route path="/profile" element={<Profile />} />
      ) : (
        <Navigate to="/login" replace />
      )}
    </Routes>
  );
}
