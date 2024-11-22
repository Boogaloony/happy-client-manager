import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_PERMISSIONS, DEFAULT_ROLES } from "@/types/permissions";
import { PermissionGuard } from "@/components/PermissionGuard";

const Settings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      
      <div className="grid gap-6">
        <PermissionGuard permissions={['admin']}>
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {DEFAULT_ROLES.map((role) => (
                  <div key={role.id} className="border-b pb-4">
                    <h3 className="font-semibold text-lg">{role.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {role.permissions.map((permId) => {
                        const permission = DEFAULT_PERMISSIONS.find(p => p.id === permId);
                        return permission ? (
                          <span key={permId} className="text-sm bg-secondary px-2 py-1 rounded">
                            {permission.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {Object.entries(
                  DEFAULT_PERMISSIONS.reduce((acc, perm) => {
                    if (!acc[perm.category]) acc[perm.category] = [];
                    acc[perm.category].push(perm);
                    return acc;
                  }, {} as Record<string, typeof DEFAULT_PERMISSIONS>)
                ).map(([category, permissions]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg capitalize mb-3">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="border rounded p-3">
                          <h4 className="font-medium">{permission.name}</h4>
                          <p className="text-sm text-muted-foreground">{permission.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </PermissionGuard>
      </div>
    </div>
  );
};

export default Settings;