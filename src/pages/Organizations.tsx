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
import { Plus } from "lucide-react";
import { mockOrganizations } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrganizationForm } from "@/components/OrganizationForm";
import { PermissionGuard } from "@/components/PermissionGuard";

/**
 * Organizations Page
 * 
 * Main dashboard for managing organizations. This page:
 * - Displays a list of all organizations in a table format
 * - Provides ability to create new organizations via a modal form
 * - Allows navigation to detailed view of each organization
 * 
 * Design Decisions:
 * - Country information is stored but not displayed in the table to reduce clutter
 * - Organizations can be marked as cash-only which affects tax requirements
 * - Uses shadcn/ui components for consistent styling
 * - Implements responsive design for various screen sizes
 */

const Organizations = () => {
  const [organizations] = useState(mockOrganizations);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Organizations</h1>
        <PermissionGuard permissions={['org.create']}>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Organization</DialogTitle>
              </DialogHeader>
              <OrganizationForm />
            </DialogContent>
          </Dialog>
        </PermissionGuard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Team Members</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow 
                  key={org.id}
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => navigate(`/organizations/${org.id}`)}
                >
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>{org.employees}</TableCell>
                  <TableCell>{org.isCashOnly ? "Cash Only" : "Regular"}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        org.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {org.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizations;
