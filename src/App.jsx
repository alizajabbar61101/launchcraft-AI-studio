import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import MyProjects from "./components/dashboard/MyProjects"; // adjust path if yours differs
import ActivityPage from "./pages/ActivityPage";             // adjust path if yours differs
import Workspace from "./pages/Workspace";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Everything in here shares one Sidebar via DashboardLayout,
              so clicking between Dashboard / My Projects / Recent Activity
              never loses navigation. */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="/activity" element={<ActivityPage />} />
          </Route>

          <Route
            path="/workspace/:projectId"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;