import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPanel from "./pages/UserPanel";
import RequestSprint from "./pages/RequestSprint";
import SprintResults from "./pages/SprintResults";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="/user-panel" element={<PrivateRoute element={<UserPanel />} />} />
          <Route path="/request-sprint" element={<RequestSprint />} />
          <Route path="/sprint-results" element={<SprintResults />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
