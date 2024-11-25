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
import { UserForm } from "@/components/UserForm";
import { PermissionGuard } from "@/components/PermissionGuard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TeamMemberRow } from "@/components/TeamMemberRow";
import { UserDetailsDialog } from "@/components/UserDetailsDialog";
import { User } from "@/types/users";

const Users = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const currentOrganizationId = 1; // This would typically come from a context or state

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
                    <TeamMemberRow
                      key={user.id}
                      user={user}
                      onSelect={setSelectedUser}
                      currentOrganizationId={currentOrganizationId}
                    />
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

      <UserDetailsDialog
        user={selectedUser}
        onOpenChange={() => setSelectedUser(null)}
        currentOrganizationId={currentOrganizationId}
      />
    </div>
  );
};

export default Users;