import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profilee";

function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </UserContextProvider>
  );
}

export default App;
