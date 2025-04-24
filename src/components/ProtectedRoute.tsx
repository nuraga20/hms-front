// CHECK POINT 2

// ProtectedRoute.tsx

import { User } from '../types/hms';
import { PropsWithChildren } from 'react';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import Loader from '../common/Loader';

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User['role'][];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <Loader />;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
}
