export interface Organization {
  id: number;
  name: string;
  type: string;
  employees: number;
  status: "active" | "inactive";
  parentId?: number | null;
  isFolder?: boolean;
}

export interface OrganizationFolder {
  id: number;
  name: string;
  parentId?: number | null;
  organizations: Organization[];
}