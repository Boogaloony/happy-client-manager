import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PermissionGuard } from "@/components/PermissionGuard";
import { User } from "@/types/users";

interface TeamMemberRowProps {
  user: User;
  onSelect: (user: User) => void;
  currentOrganizationId?: number;
}

export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({
  user,
  onSelect,
  currentOrganizationId = 1, // Default to first organization if not specified
}) => {
  const currentRole = user.organizationRoles.find(
    (r) => r.organizationId === currentOrganizationId
  )?.role || "N/A";

  return (
    <TableRow 
      key={user.id} 
      className="cursor-pointer"
      onClick={() => onSelect(user)}
    >
      <TableCell className="font-medium">
        {user.name}
      </TableCell>
      <TableCell>
        <a 
          href={`mailto:${user.email}`}
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 hover:underline"
        >
          {user.email}
        </a>
      </TableCell>
      <TableCell>
        <PermissionGuard 
          permissions={['roles.view']}
          fallback={<span>{currentRole}</span>}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add your role details logic here
            }}
            className="hover:underline"
          >
            {currentRole}
          </button>
        </PermissionGuard>
      </TableCell>
      <TableCell>
        <PermissionGuard 
          permissions={['users.edit']}
          fallback={<span>{user.status}</span>}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add your status change logic here
            }}
            className="hover:underline"
          >
            {user.status}
          </button>
        </PermissionGuard>
      </TableCell>
      <TableCell>
        {/* Actions cell can be empty since the whole row is clickable */}
      </TableCell>
    </TableRow>
  );
};