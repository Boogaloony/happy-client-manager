export interface Organization {
  id: number;
  name: string;
  type: string;
  employees: number;
  status: "active" | "inactive";
  parentId?: number | null;
  isFolder?: boolean;
  serviceType?: string;
  areas?: Area[];
}

export interface Area {
  id: number;
  name: string;
  organizationId: number;
  serviceType: string;
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
  areaIds?: number[]; // Areas the user has access to
}