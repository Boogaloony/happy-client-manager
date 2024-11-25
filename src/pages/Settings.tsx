import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_PERMISSIONS, DEFAULT_ROLE_TEMPLATES } from "@/types/permissions";
import { PermissionGuard } from "@/components/PermissionGuard";
import { mockOrganizations } from "@/data/mockData";

const Settings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      
      <div className="grid gap-6">
        <PermissionGuard permissions={['admin']}>
          <Tabs defaultValue={mockOrganizations[0].id.toString()} className="w-full">
            <TabsList className="w-full justify-start">
              {mockOrganizations.map(org => (
                <TabsTrigger key={org.id} value={org.id.toString()}>
                  {org.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {mockOrganizations.map(org => (
              <TabsContent key={org.id} value={org.id.toString()}>
                <Card>
                  <CardHeader>
                    <CardTitle>Roles for {org.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {DEFAULT_ROLE_TEMPLATES.map((role) => (
                        <div key={role.name} className="border-b pb-4">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {role.name}
                            {role.isMaster && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Organization Creator
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                          
                          <div className="grid gap-6">
                            {Object.entries(
                              DEFAULT_PERMISSIONS.reduce((acc, perm) => {
                                if (!acc[perm.category]) acc[perm.category] = [];
                                acc[perm.category].push(perm);
                                return acc;
                              }, {} as Record<string, typeof DEFAULT_PERMISSIONS>)
                            ).map(([category, permissions]) => (
                              <div key={category} className="space-y-4">
                                <h4 className="font-medium capitalize">{category}</h4>
                                <div className="grid gap-4">
                                  {permissions.map((permission) => (
                                    <div key={permission.id} className="flex flex-col gap-2">
                                      <Label>{permission.name}</Label>
                                      {permission.allowMultiple ? (
                                        <div className="flex gap-4">
                                          <div className="flex items-center gap-2">
                                            <Checkbox id={`${permission.id}-view-${role.name}`} />
                                            <Label htmlFor={`${permission.id}-view-${role.name}`}>View</Label>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Checkbox id={`${permission.id}-edit-${role.name}`} />
                                            <Label htmlFor={`${permission.id}-edit-${role.name}`}>Edit</Label>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Checkbox id={`${permission.id}-delete-${role.name}`} />
                                            <Label htmlFor={`${permission.id}-delete-${role.name}`}>Delete</Label>
                                          </div>
                                        </div>
                                      ) : (
                                        <RadioGroup defaultValue="view">
                                          <div className="flex gap-4">
                                            <div className="flex items-center gap-2">
                                              <RadioGroupItem value="view" id={`${permission.id}-view-${role.name}`} />
                                              <Label htmlFor={`${permission.id}-view-${role.name}`}>View</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <RadioGroupItem value="manage" id={`${permission.id}-manage-${role.name}`} />
                                              <Label htmlFor={`${permission.id}-manage-${role.name}`}>Manage</Label>
                                            </div>
                                          </div>
                                        </RadioGroup>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </PermissionGuard>
      </div>
    </div>
  );
};

export default Settings;