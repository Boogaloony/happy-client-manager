import React from "react";
import { Button } from "@/components/ui/button";
import { mockUsers, mockOrganizations } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEFAULT_ROLES = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Manager' }
];

interface UserFormProps {
  onSuccess: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Create new mock user with organization-specific roles
    const newUser = {
      id: mockUsers.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      status: "active" as const,
      organizationRoles: mockOrganizations.map(org => ({
        organizationId: org.id,
        role: formData.get(`role-${org.id}`) as string || 'user'
      })),
      lastActive: new Date()
    };

    // Add to mock data array
    mockUsers.push(newUser);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <Input id="name" name="name" required />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input id="email" name="email" type="email" required />
      </div>
      
      {mockOrganizations.map(org => (
        <div key={org.id} className="space-y-2">
          <label htmlFor={`role-${org.id}`} className="text-sm font-medium">
            Role in {org.name}
          </label>
          <Select name={`role-${org.id}`} required>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_ROLES.map(role => (
                <SelectItem key={role.id} value={role.name.toLowerCase()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <Button type="submit" className="w-full">Create User</Button>
    </form>
  );
};