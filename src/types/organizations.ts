/**
 * Organization Type Definitions
 * 
 * Core type definitions for the organization management system.
 * 
 * Organization Interface:
 * - Defines the structure of organization data
 * - Includes optional country-specific tax fields
 * - Supports both cash-only and regular business types
 * 
 * Job Interface:
 * - Represents work assignments within organizations
 * - Includes scheduling and status tracking
 * - Supports tagging for better organization
 * 
 * Design Considerations:
 * - Tax fields are optional to support cash-only businesses
 * - Status fields use string literals for type safety
 * - All country-specific fields are nullable for flexibility
 */

export interface Organization {
  id: number;
  name: string;
  employees: number;
  status: "active" | "inactive";
  country: string;
  isCashOnly: boolean;
  // Country specific fields - all optional
  vatNumber: string | null;
  abn: string | null;
  ein: string | null;
  gstin: string | null;
}

export interface Job {
  id: number;
  organizationId: number;
  scheduledDate: Date;
  status: "pending" | "in-progress" | "completed";
  tags: string[];
  description?: string;
}
