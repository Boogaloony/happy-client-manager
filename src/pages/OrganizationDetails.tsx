import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrganizations } from "@/data/mockData";

const OrganizationDetails = () => {
  const { id } = useParams();
  const organization = mockOrganizations.find((org) => org.id === Number(id));

  if (!organization) {
    return <div className="container mx-auto p-6">Organization not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{organization.name}</h1>
      
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
              <span className="font-medium">Status:</span> {organization.status}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetails;