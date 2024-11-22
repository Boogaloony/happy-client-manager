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