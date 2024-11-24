import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { mockUsers, DEFAULT_ROLES } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/UserForm.tsx";
import { PermissionGuard } from "@/components/PermissionGuard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/**
 * Users/Teams Page
 * 
 * @component
 * Main dashboard for managing team members.
 * 
 * @description
 * - Displays a list of all users in a table format
 * - Provides ability to create new users via a modal form
 * - Allows navigation to detailed view of each user
 * - Implements role-based access control
 * 
 * @database
 * Table: Users
 * - id: Primary key
 * - name: string (required)
 * - email: string (unique, required)
 * - role: string (references Roles table)
 * - status: enum ('active', 'inactive', 'pending')
 * - organizationId: foreign key (Organizations)
 * - lastActive: timestamp
 * - createdAt: timestamp
 * - updatedAt: timestamp
 * 
 * Indexes:
 * - email (unique)
 * - organizationId, status (compound)
 * 
 * Relationships:
 * - belongsTo Organization
 * - hasOne Role
 * - hasMany Permissions through Role
 * 
 * Audit Requirements:
 * - Track status changes
 * - Log role assignments
 * - Record last active timestamp
 */

const Users = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Team Members</h1>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <PermissionGuard permissions={['roles.manage']}>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </PermissionGuard>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <PermissionGuard permissions={['users.create']}>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team Member</DialogTitle>
                    </DialogHeader>
                    <UserForm onSuccess={() => setIsCreateModalOpen(false)} />
                  </DialogContent>
                </Dialog>
              </PermissionGuard>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow 
                      key={user.id} 
                      className="cursor-pointer"
                      onClick={() => setSelectedUser(user)}
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
                          fallback={<span>{user.role}</span>}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add your role details logic here
                            }}
                            className="hover:underline"
                          >
                            {user.role}
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
                        {/* Remove the existing button since the whole row is clickable */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Roles</CardTitle>
              <PermissionGuard permissions={['roles.create']}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </PermissionGuard>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {DEFAULT_ROLES.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{role.name}</h3>
                      <PermissionGuard permissions={['roles.delete']}>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </PermissionGuard>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permId) => (
                        <span
                          key={permId}
                          className="text-xs bg-secondary px-2 py-1 rounded"
                        >
                          {permId}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <span className="font-medium">Name:</span> {selectedUser.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {selectedUser.email}
              </div>
              <div>
                <span className="font-medium">Role:</span> {selectedUser.role}
              </div>
              <div>
                <span className="font-medium">Status:</span> {selectedUser.status}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;