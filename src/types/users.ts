/**
 * User Type Definitions
 * 
 * Core type definitions for the user management system.
 * 
 * User Interface:
 * - Defines the structure of user data
 * - Includes role and permission associations per organization
 * - Tracks user status and activity
 * 
 * Design Considerations:
 * - Roles are organization-specific
 * - Status uses string literals for type safety
 * - Organization relationships include role information
 * 
 * Database Requirements:
 * - Users can have different roles per organization
 * - Role assignments need to be tracked per organization
 * - Activity timestamps for audit purposes
 * - Status changes should be logged
 */

export interface OrganizationRole {
  organizationId: number;
  role: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  organizationRoles: OrganizationRole[];
  lastActive?: Date;
}