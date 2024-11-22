import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGuardProps {
  children: ReactNode;
  permissions: string[];
  fallback?: ReactNode;
}

export const PermissionGuard = ({ children, permissions, fallback = null }: PermissionGuardProps) => {
  const { checkPermissions } = usePermissions();

  if (!checkPermissions(permissions)) {
    return fallback;
  }

  return <>{children}</>;
};