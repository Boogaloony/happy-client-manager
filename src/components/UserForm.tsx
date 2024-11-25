import React from "react";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/data/mockData";
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
    
    // Create new mock user with organizationIds array instead of single organizationId
    const newUser = {
      id: mockUsers.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      status: 'active',
      organizationIds: [1], // Now using organizationIds array instead of single organizationId
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
      
      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">Role</label>
        <Select name="role" required>
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

      <Button type="submit" className="w-full">Create User</Button>
    </form>
  );
};