import DashBoard from "./DashBoard";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./User";
import { LayoutApp } from "../layout";
import Login from "./Login";
import Editar from "./Editar";
import { useAuth } from "../context/useContext";
const Rutas = () => {
  const { user } = useAuth();

  return (
    <div>
      <LayoutApp>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute user={user}>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ingresar"
            element={
              <ProtectedRoute user={user}>
                <Editar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar/:id"
            element={
              <ProtectedRoute user={user}>
                <Editar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutApp>
    </div>
  );
};

export default Rutas;

const ProtectedRoute = ({ user, children }) => {
  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
