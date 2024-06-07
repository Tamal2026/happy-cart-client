import { ReactNode, useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext,AuthContextType } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

interface AdminRoutesProps {
  children: ReactNode;
}

const AdminRoutes: React.FC<AdminRoutesProps> = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const authContext = useContext(AuthContext) as AuthContextType;
const { user,loading } = authContext;


  const location = useLocation();

  if (loading || isAdminLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user && isAdmin) {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoutes;
