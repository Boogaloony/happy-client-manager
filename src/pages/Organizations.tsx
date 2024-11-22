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
import { Plus, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { Organization } from "@/types/organizations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mockOrganizations: Organization[] = [
  {
    id: 1,
    name: "Mowing Services",
    type: "Folder",
    employees: 0,
    status: "active",
    isFolder: true,
  },
  {
    id: 2,
    name: "Sydney West Mowing",
    type: "LLC",
    employees: 15,
    status: "active",
    parentId: 1,
  },
  {
    id: 3,
    name: "Eastern Suburbs Mowing",
    type: "LLC",
    employees: 12,
    status: "active",
    parentId: 1,
  },
  {
    id: 4,
    name: "Cleaning Services",
    type: "Folder",
    employees: 0,
    status: "active",
    isFolder: true,
  },
  {
    id: 5,
    name: "City Cleaners",
    type: "Corporation",
    employees: 45,
    status: "active",
    parentId: 4,
  },
];

const Organizations = () => {
  const [organizations] = useState<Organization[]>(mockOrganizations);

  const getFolders = () => organizations.filter((org) => org.isFolder);
  
  const getOrganizationsInFolder = (folderId: number) => 
    organizations.filter((org) => org.parentId === folderId);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Organizations</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <Folder className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
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
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Employees</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getOrganizationsInFolder(folder.id).map((org) => (
                        <TableRow key={org.id}>
                          <TableCell className="font-medium">{org.name}</TableCell>
                          <TableCell>{org.type}</TableCell>
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

          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Unorganized</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations
                  .filter((org) => !org.isFolder && !org.parentId)
                  .map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.name}</TableCell>
                      <TableCell>{org.type}</TableCell>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizations;