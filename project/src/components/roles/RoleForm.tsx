import React from 'react';
import { Role, Permission } from '../../types';
import { permissions } from '../../data/mockData';

interface RoleFormProps {
  onSubmit: (data: Partial<Role>) => void;
  initialData?: Role;
}

export function RoleForm({ onSubmit, initialData }: RoleFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const selectedPermissions = permissions.filter(p => formData.get(p.id) === 'on');
    
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      permissions: selectedPermissions,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={initialData?.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          defaultValue={initialData?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {permissions.map(permission => (
            <div key={permission.id} className="flex items-center">
              <input
                type="checkbox"
                id={permission.id}
                name={permission.id}
                defaultChecked={initialData?.permissions.some(p => p.id === permission.id)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={permission.id} className="ml-2 block text-sm text-gray-900">
                {permission.name} - {permission.description}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}