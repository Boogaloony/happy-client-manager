/**
 * Mock Data Configuration
 * 
 * This file contains mock data for development and testing purposes.
 */

export const mockOrganizations = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    employees: 7,
    status: "active",
    country: "USA",
    isCashOnly: false,
    ein: "12-3456789",
    vatNumber: null,
    abn: null,
    gstin: null
  },
  {
    id: 2,
    name: "Digital Services Co",
    employees: 5,
    status: "active",
    country: "Australia",
    isCashOnly: false,
    ein: null,
    vatNumber: null,
    abn: "51824753556",
    gstin: null
  }
];

export const countryFields = {
  USA: [
    { name: "ein", label: "EIN Number", required: true }
  ],
  Australia: [
    { name: "abn", label: "ABN Number", required: true }
  ],
  India: [
    { name: "gstin", label: "GSTIN Number", required: true }
  ],
  EU: [
    { name: "vatNumber", label: "VAT Number", required: true }
  ]
};

export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@techsolutions.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 1, role: "admin" },
      { organizationId: 2, role: "user" }
    ],
    lastActive: new Date()
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@techsolutions.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 1, role: "manager" },
      { organizationId: 2, role: "manager" }
    ],
    lastActive: new Date()
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@digital.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 2, role: "admin" }
    ],
    lastActive: new Date()
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@techsolutions.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 1, role: "manager" }
    ],
    lastActive: new Date()
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@digital.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 2, role: "admin" }
    ],
    lastActive: new Date()
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana@techsolutions.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 1, role: "user" },
      { organizationId: 2, role: "manager" }
    ],
    lastActive: new Date()
  },
  {
    id: 7,
    name: "Edward Blake",
    email: "edward@digital.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 2, role: "user" }
    ],
    lastActive: new Date()
  },
  {
    id: 8,
    name: "Frank Castle",
    email: "frank@techsolutions.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 1, role: "manager" }
    ],
    lastActive: new Date()
  },
  {
    id: 9,
    name: "Grace Lee",
    email: "grace@digital.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 2, role: "user" }
    ],
    lastActive: new Date()
  },
  {
    id: 10,
    name: "Henry Ford",
    email: "henry@techsolutions.com",
    status: "active" as const,
    organizationRoles: [
      { organizationId: 1, role: "user" },
      { organizationId: 2, role: "user" }
    ],
    lastActive: new Date()
  }
];

export const DEFAULT_ROLES = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    permissions: ["users.create", "users.edit", "roles.manage", "roles.create", "roles.delete"]
  },
  {
    id: 2,
    name: "Manager",
    description: "Team and project management",
    permissions: ["users.view", "users.edit", "schedule.manage"]
  },
  {
    id: 3,
    name: "User",
    description: "Standard user access",
    permissions: ["users.view"]
  }
];