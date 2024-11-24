/**
 * Mock Data Configuration
 * 
 * This file contains mock data for development and testing purposes.
 * 
 * mockOrganizations:
 * - Represents sample organizations with different configurations
 * - Includes examples of both cash-only and regular businesses
 * - Contains country-specific tax identifiers (EIN, VAT, ABN, GSTIN)
 * 
 * countryFields:
 * - Maps countries to their required tax identification fields
 * - Used by OrganizationForm to dynamically render appropriate fields
 * - Each country has specific tax number requirements:
 *   * USA: EIN (Employer Identification Number)
 *   * EU: VAT Number
 *   * Australia: ABN (Australian Business Number)
 *   * India: GSTIN (Goods and Services Tax Identification Number)
 * 
 * To Do Later:
 * - Add more comprehensive mock data for testing
 * - Include sample documents and user assignments
 * - Add mock transaction history
 * - Include sample audit logs
 * - Add mock data for different organization structures
 */

export const mockOrganizations = [
  {
    id: 1,
    name: "Jim's Business",
    employees: 3,
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
    name: "My Weekend Business",
    employees: 1,
    status: "active",
    country: "Australia",
    isCashOnly: true,
    ein: null,
    vatNumber: null,
    abn: null,
    gstin: null
  },
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
    email: "john@example.com",
    role: "admin",
    status: "active",
    organizationId: 1,
    lastActive: new Date()
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "manager",
    status: "active",
    organizationId: 1,
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
    name: "User",
    description: "Standard user access",
    permissions: ["users.view"]
  }
];
