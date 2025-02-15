import { Navigate } from "react-router";

import { useAuth } from "@/contexts/auth-context";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return !isAuthenticated ? <Navigate to="/auth" /> : <>{children}</>;
};

export default PrivateRoute;
