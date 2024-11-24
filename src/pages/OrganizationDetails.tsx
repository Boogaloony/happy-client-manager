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
              <span className="font-medium">Country:</span> {organization.country}
            </div>
            <div>
              <span className="font-medium">Type:</span> {organization.isCashOnly ? "Cash Only" : "Regular"}
            </div>
            <div>
              <span className="font-medium">Status:</span> {organization.status}
            </div>
            {!organization.isCashOnly && (
              <>
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
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetails;
