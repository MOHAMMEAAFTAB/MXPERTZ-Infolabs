import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";

import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/hospital" element={<Navbar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
