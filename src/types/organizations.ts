export interface Organization {
  id: number;
  name: string;
  type: string;
  employees: number;
  status: "active" | "inactive";
  parentId?: number | null;
  isFolder?: boolean;
  serviceType?: string;
}

export interface OrganizationFolder {
  id: number;
  name: string;
  parentId?: number | null;
  organizations: Organization[];
}

export interface UserAccess {
  userId: number;
  organizationId: number;
  serviceTypes: string[];
  tags?: string[]; // Tags the user has access to
}

export interface Job {
  id: number;
  organizationId: number;
  serviceType: string;
  scheduledDate: Date;
  status: "pending" | "in-progress" | "completed";
  tags: string[]; // Tags for grouping and access control
  description?: string;
}