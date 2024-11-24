import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGuardProps {
  children: ReactNode;
  permissions: string[];
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ children }) => {
  // TODO: Implement proper permission checking logic
  // This is a temporary solution that allows all permissions
  return <>{children}</>;
};