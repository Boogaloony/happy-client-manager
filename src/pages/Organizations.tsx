import { useState } from "react";
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
import { Plus, Folder, Wrench, Scissors, MapPin } from "lucide-react";
import { Organization, Area } from "@/types/organizations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mockOrganizations: Organization[] = [
  {
    id: 1,
    name: "Jim's Business",
    type: "Folder",
    employees: 0,
    status: "active",
    isFolder: true,
  },
  {
    id: 2,
    name: "Mowing Services",
    type: "Service",
    employees: 3,
    status: "active",
    parentId: 1,
    serviceType: "mowing",
    areas: [
      { id: 1, name: "North Region", organizationId: 2, serviceType: "mowing" },
      { id: 2, name: "South Region", organizationId: 2, serviceType: "mowing" },
      { id: 3, name: "East Region", organizationId: 2, serviceType: "mowing" },
    ],
  },
  {
    id: 3,
    name: "Handyman Services",
    type: "Service",
    employees: 2,
    status: "active",
    parentId: 1,
    serviceType: "handyman",
    areas: [
      { id: 4, name: "Central Region", organizationId: 3, serviceType: "handyman" },
      { id: 5, name: "West Region", organizationId: 3, serviceType: "handyman" },
    ],
  },
  {
    id: 4,
    name: "My Weekend Business",
    type: "Folder",
    employees: 0,
    status: "active",
    isFolder: true,
  },
  {
    id: 5,
    name: "Personal Mowing",
    type: "Service",
    employees: 1,
    status: "active",
    parentId: 4,
    serviceType: "mowing",
    areas: [
      { id: 6, name: "Local Area", organizationId: 5, serviceType: "mowing" },
    ],
  },
];

const Organizations = () => {
  const [organizations] = useState<Organization[]>(mockOrganizations);

  const getFolders = () => organizations.filter((org) => org.isFolder);
  
  const getOrganizationsInFolder = (folderId: number) => 
    organizations.filter((org) => org.parentId === folderId);

  const getServiceIcon = (serviceType?: string) => {
    switch (serviceType) {
      case 'mowing':
        return <Scissors className="h-4 w-4 mr-2" />;
      case 'handyman':
        return <Wrench className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Organizations</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <Folder className="h-4 w-4 mr-2" />
            New Organization
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {getFolders().map((folder) => (
              <AccordionItem value={folder.id.toString()} key={folder.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4" />
                    <span>{folder.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Areas</TableHead>
                        <TableHead>Team Members</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getOrganizationsInFolder(folder.id).map((org) => (
                        <TableRow key={org.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {getServiceIcon(org.serviceType)}
                              {org.name}
                            </div>
                          </TableCell>
                          <TableCell>{org.serviceType}</TableCell>
                          <TableCell>
                            <Collapsible>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {org.areas?.length || 0} Areas
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-2">
                                <ul className="space-y-2">
                                  {org.areas?.map((area) => (
                                    <li key={area.id} className="flex items-center text-sm text-muted-foreground">
                                      <MapPin className="h-3 w-3 mr-2" />
                                      {area.name}
                                    </li>
                                  ))}
                                </ul>
                              </CollapsibleContent>
                            </Collapsible>
                          </TableCell>
                          <TableCell>{org.employees}</TableCell>
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizations;