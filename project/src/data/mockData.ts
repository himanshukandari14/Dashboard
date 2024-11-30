import { User, Role, Permission } from '../types';

export const permissions: Permission[] = [
  { id: '1', name: 'read:users', description: 'View users', module: 'users' },
  { id: '2', name: 'write:users', description: 'Create/Edit users', module: 'users' },
  { id: '3', name: 'delete:users', description: 'Delete users', module: 'users' },
  { id: '4', name: 'read:roles', description: 'View roles', module: 'roles' },
  { id: '5', name: 'write:roles', description: 'Create/Edit roles', module: 'roles' },
  { id: '6', name: 'delete:roles', description: 'Delete roles', module: 'roles' },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: permissions,
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can manage content',
    permissions: permissions.filter(p => !p.name.startsWith('delete')),
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: permissions.filter(p => p.name.startsWith('read')),
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: roles[0],
    status: 'active',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: roles[1],
    status: 'active',
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: roles[2],
    status: 'inactive',
    createdAt: '2024-03-13',
  },
];