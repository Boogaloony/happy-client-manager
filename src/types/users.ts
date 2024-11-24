/**
 * User Type Definitions
 * 
 * Core type definitions for the user management system.
 * 
 * User Interface:
 * - Defines the structure of user data
 * - Includes role and permission associations
 * - Tracks user status and activity
 * 
 * Design Considerations:
 * - Roles are string-based for simplicity
 * - Status uses string literals for type safety
 * - Organization relationship is required
 * 
 * Database Requirements:
 * - Users must be associated with organizations
 * - Role assignments need to be tracked
 * - Activity timestamps for audit purposes
 * - Status changes should be logged
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  organizationId: number;
  lastActive?: Date;
} 