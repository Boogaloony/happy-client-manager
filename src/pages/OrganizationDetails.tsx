import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrganizations } from "@/data/mockData";
import { PermissionGuard } from "@/components/PermissionGuard";

/**
 * Organization Details Page
 * 
 * Displays detailed information about a specific organization using a tabbed interface.
 * 
 * Features:
 * - Shows organization details in a structured, tabbed layout
 * - Separates concerns into different tabs for better organization
 * - Displays tax information based on organization type
 * - Implements permission-based access control for sensitive tabs
 * 
 * To Do Later:
 * - Implement full CRUD operations for organization management
 * - Add audit log for changes to organization details
 * - Implement document upload/management system
 * - Add integration with accounting software
 * - Implement user permissions per organization
 */

const OrganizationDetails = () => {
  const { id } = useParams();
  const organization = mockOrganizations.find((org) => org.id === Number(id));

  if (!organization) {
    return <div className="container mx-auto p-6">Organization not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{organization.name}</h1>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">General Info</TabsTrigger>
          <PermissionGuard permissions={['users.view']}>
            <TabsTrigger value="users">Users</TabsTrigger>
          </PermissionGuard>
          <PermissionGuard permissions={['accounting.view']}>
            <TabsTrigger value="accounting">Accounting</TabsTrigger>
          </PermissionGuard>
          <PermissionGuard permissions={['admin']}>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </PermissionGuard>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Employees:</span> {organization.employees}
                </div>
                <div>
                  <span className="font-medium">Country:</span> {organization.country}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {organization.isCashOnly ? "Cash Only" : "Regular"}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {organization.status}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <PermissionGuard permissions={['users.view']}>
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </PermissionGuard>

        <PermissionGuard permissions={['accounting.view']}>
          <TabsContent value="accounting">
            <Card>
              <CardHeader>
                <CardTitle>Accounting Information</CardTitle>
              </CardHeader>
              <CardContent>
                {!organization.isCashOnly && (
                  <div className="space-y-4">
                    {organization.vatNumber && (
                      <div>
                        <span className="font-medium">VAT Number:</span> {organization.vatNumber}
                      </div>
                    )}
                    {organization.abn && (
                      <div>
                        <span className="font-medium">ABN:</span> {organization.abn}
                      </div>
                    )}
                    {organization.ein && (
                      <div>
                        <span className="font-medium">EIN:</span> {organization.ein}
                      </div>
                    )}
                    {organization.gstin && (
                      <div>
                        <span className="font-medium">GSTIN:</span> {organization.gstin}
                      </div>
                    )}
                  </div>
                )}
                {organization.isCashOnly && (
                  <p className="text-muted-foreground">This is a cash-only business.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </PermissionGuard>

        <PermissionGuard permissions={['admin']}>
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Document management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </PermissionGuard>
      </Tabs>
    </div>
  );
};

export default OrganizationDetails;