import React, { useContext, ReactNode } from "react";
import { AuthContext,AuthContextType } from "../../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const { user,loading } = authContext;
  
  const location = useLocation();
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
