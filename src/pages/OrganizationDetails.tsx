import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrganizations } from "@/data/mockData";

/**
 * Organization Details Page
 * 
 * Displays detailed information about a specific organization using a tabbed interface.
 * 
 * Features:
 * - Shows organization details in a structured, tabbed layout
 * - Separates concerns into different tabs for better organization
 * - Displays tax information based on organization type
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
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default OrganizationDetails;