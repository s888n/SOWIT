
import {
    Navigate,
    Outlet,
  } from 'react-router';

import { useAuth } from '@/contexts/auth-context';
const Protected = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}

export default Protected;