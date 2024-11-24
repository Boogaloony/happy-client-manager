# Database Schema Documentation

# Database Schema

## Organizations
- id: Primary key
- name: string
- employees: number
- status: enum ('active', 'inactive')
- country: string
- isCashOnly: boolean
- vatNumber: string (nullable)
- abn: string (nullable)
- ein: string (nullable)
- gstin: string (nullable)

## Users
- id: Primary key
- name: string
- email: string
- role: string (references Roles)
- organizationId: foreign key (Organizations)

## Roles
- id: string (primary key)
- name: string
- description: string

## Permissions
- id: string (primary key)
- name: string
- description: string
- category: string

## RolePermissions
- roleId: foreign key (Roles)
- permissionId: foreign key (Permissions)

## Jobs
- id: Primary key
- organizationId: foreign key (Organizations)
- scheduledDate: datetime
- status: enum ('pending', 'in-progress', 'completed')
- description: text (nullable)

## JobTags
- jobId: foreign key (Jobs)
- tag: string