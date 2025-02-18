import { Navigate } from "react-router";

import { useAuth } from "@/contexts/auth-context";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return auth.user ? <>{children}</> : <Navigate to="/auth" />;
};

export default PrivateRoute;
