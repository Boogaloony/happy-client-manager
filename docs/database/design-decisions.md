# Database Design Decisions

## Organization Structure
- Organizations can be either cash-only or regular businesses
- Tax identification fields are nullable to accommodate different business types
- Country-specific tax fields (VAT, ABN, EIN, GSTIN) are included in the main table since they're fundamental to the organization

## Permission System
- Role-based access control (RBAC) implemented
- Permissions are categorized by feature area
- Default roles (Admin, Manager, Staff) with predefined permission sets
- Granular permissions for each feature area

## Job Management
- Jobs are linked to organizations
- Flexible tagging system for job categorization
- Status tracking built into the schema

## Design Patterns
- Using soft deletes for data retention
- Implementing audit logging for critical tables
- Normalized structure for permissions and roles 