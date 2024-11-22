export type Permission = {
  id: string;
  name: string;
  description: string;
  category: 'organizations' | 'users' | 'schedule' | 'quotes' | 'customers';
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs
};

export const DEFAULT_PERMISSIONS: Permission[] = [
  // Organization permissions
  { id: 'org.view', name: 'View Organizations', description: 'Can view organization details', category: 'organizations' },
  { id: 'org.create', name: 'Create Organizations', description: 'Can create new organizations', category: 'organizations' },
  { id: 'org.edit', name: 'Edit Organizations', description: 'Can edit organization details', category: 'organizations' },
  { id: 'org.delete', name: 'Delete Organizations', description: 'Can delete organizations', category: 'organizations' },
  
  // User permissions
  { id: 'users.view', name: 'View Users', description: 'Can view user details', category: 'users' },
  { id: 'users.create', name: 'Create Users', description: 'Can create new users', category: 'users' },
  { id: 'users.edit', name: 'Edit Users', description: 'Can edit user details', category: 'users' },
  { id: 'users.delete', name: 'Delete Users', description: 'Can delete users', category: 'users' },
  
  // Schedule permissions
  { id: 'schedule.view', name: 'View Schedule', description: 'Can view schedule', category: 'schedule' },
  { id: 'schedule.create', name: 'Create Appointments', description: 'Can create appointments', category: 'schedule' },
  { id: 'schedule.edit', name: 'Edit Appointments', description: 'Can edit appointments', category: 'schedule' },
  { id: 'schedule.delete', name: 'Delete Appointments', description: 'Can delete appointments', category: 'schedule' },
  
  // Quote permissions
  { id: 'quotes.view', name: 'View Quotes', description: 'Can view quotes', category: 'quotes' },
  { id: 'quotes.create', name: 'Create Quotes', description: 'Can create quotes', category: 'quotes' },
  { id: 'quotes.edit', name: 'Edit Quotes', description: 'Can edit quotes', category: 'quotes' },
  { id: 'quotes.delete', name: 'Delete Quotes', description: 'Can delete quotes', category: 'quotes' }
];

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: DEFAULT_PERMISSIONS.map(p => p.id)
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Can manage most aspects except system settings',
    permissions: DEFAULT_PERMISSIONS.filter(p => !p.id.includes('delete')).map(p => p.id)
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'Basic access to view and create',
    permissions: DEFAULT_PERMISSIONS.filter(p => p.id.includes('view') || p.id.includes('create')).map(p => p.id)
  }
];