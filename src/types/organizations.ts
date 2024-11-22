export interface Organization {
  id: number;
  name: string;
  employees: number;
  status: "active" | "inactive";
}

export interface Job {
  id: number;
  organizationId: number;
  scheduledDate: Date;
  status: "pending" | "in-progress" | "completed";
  tags: string[];
  description?: string;
}