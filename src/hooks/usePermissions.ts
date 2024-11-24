import { useCallback } from 'react';
import { Permission } from '@/types/permissions';

// This would typically come from your auth context/state management
const mockUserPermissions = [
  'org.view', 
  'users.view', 
  'schedule.view', 
  'quotes.view',
  'accounting.view',
  'admin'
];

export const usePermissions = () => {
  const hasPermission = useCallback((permissionId: string) => {
    // In a real app, this would check against the user's actual permissions
    return mockUserPermissions.includes(permissionId);
  }, []);

  const checkPermissions = useCallback((permissions: string[]) => {
    return permissions.every(permission => hasPermission(permission));
  }, [hasPermission]);

  return {
    hasPermission,
    checkPermissions
  };
};