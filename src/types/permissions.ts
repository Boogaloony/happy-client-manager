export type Permission = {
  id: string;
  name: string;
  description: string;
  category: 'organizations' | 'users' | 'schedule' | 'quotes' | 'customers';
  allowMultiple?: boolean; // Whether multiple levels can be selected (e.g., view + edit + delete)
};

export type Role = {
  id: string;
  name: string;
  description: string;
  organizationId: number;
  isMaster?: boolean; // Indicates if this is the organization creator's role
  permissions: {
    permissionId: string;
    level: 'view' | 'edit' | 'manage' | 'delete'; // Different levels of access
  }[];
};

export const DEFAULT_PERMISSIONS: Permission[] = [
  // Organization permissions
  { 
    id: 'org.access', 
    name: 'Organization Access', 
    description: 'Access level for organization management', 
    category: 'organizations',
    allowMultiple: false // Only one level can be selected
  },
  { 
    id: 'users.access', 
    name: 'User Management', 
    description: 'Access level for user management', 
    category: 'users',
    allowMultiple: true // Can have view + edit + delete permissions
  },
  { 
    id: 'schedule.access', 
    name: 'Schedule Management', 
    description: 'Access level for schedule management', 
    category: 'schedule',
    allowMultiple: true
  },
  { 
    id: 'quotes.access', 
    name: 'Quote Management', 
    description: 'Access level for quote management', 
    category: 'quotes',
    allowMultiple: true
  }
];

// Default role templates for new organizations
export const DEFAULT_ROLE_TEMPLATES = [
  {
    name: "Master",
    description: "Organization owner with full access",
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      permissionId: p.id,
      level: 'manage' as const
    })),
    isMaster: true
  },
  {
    name: "Admin",
    description: "Full access except organization ownership",
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      permissionId: p.id,
      level: 'manage' as const
    }))
  },
  {
    name: "Manager",
    description: "Can manage most aspects except system settings",
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      permissionId: p.id,
      level: p.id.includes('org') ? 'view' : 'edit' as const
    }))
  },
  {
    name: "Staff",
    description: "Basic access to view and create",
    permissions: DEFAULT_PERMISSIONS.map(p => ({
      permissionId: p.id,
      level: 'view' as const
    }))
  }
];