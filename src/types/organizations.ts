export interface Organization {
  id: number;
  name: string;
  employees: number;
  status: "active" | "inactive";
  country: string;
  isCashOnly: boolean;
  // Country specific fields
  vatNumber?: string; // EU countries
  abn?: string; // Australia
  ein?: string; // USA
  gstin?: string; // India
}

export interface Job {
  id: number;
  organizationId: number;
  scheduledDate: Date;
  status: "pending" | "in-progress" | "completed";
  tags: string[];
  description?: string;
}