import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/users";

interface UserDetailsDialogProps {
  user: User | null;
  onOpenChange: (open: boolean) => void;
  currentOrganizationId?: number;
}

export const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  user,
  onOpenChange,
  currentOrganizationId = 1,
}) => {
  if (!user) return null;

  const currentRole = user.organizationRoles.find(
    (r) => r.organizationId === currentOrganizationId
  )?.role || "N/A";

  return (
    <Dialog open={!!user} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Role:</span> {currentRole}
          </div>
          <div>
            <span className="font-medium">Status:</span> {user.status}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};