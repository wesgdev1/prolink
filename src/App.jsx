import { Col, Container, Row } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { ProlinkRoutes } from "./routes/ProlinkRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ProlinkRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
