import React, { useState } from 'react';
import { permissions as initialPermissions } from '../data/mockData';
import { Permission } from '../types';
import { Edit2, Trash2 } from 'lucide-react';
import { Modal } from './shared/Modal';
import { PermissionForm } from './permissions/PermissionForm';
import { useModal } from '../hooks/useModal';

export function PermissionsView() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();
  const addModal = useModal();
  const editModal = useModal();

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  const handleAdd = (data: Partial<Permission>) => {
    const newPermission: Permission = {
      id: String(permissions.length + 1),
      ...data,
    } as Permission;
    setPermissions([...permissions, newPermission]);
    addModal.closeModal();
  };

  const handleEdit = (data: Partial<Permission>) => {
    if (!selectedPermission) return;
    const updatedPermissions = permissions.map(permission =>
      permission.id === selectedPermission.id ? { ...permission, ...data } : permission
    );
    setPermissions(updatedPermissions);
    editModal.closeModal();
  };

  const handleDelete = (permissionId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(permission => permission.id !== permissionId));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Permissions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage system permissions and access controls
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={addModal.openModal}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add permission
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
          <div key={module} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
                {module} Module
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {modulePermissions.map((permission) => (
                  <li key={permission.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                        <p className="text-sm text-gray-500">{permission.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPermission(permission);
                            editModal.openModal();
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(permission.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={addModal.isOpen} onClose={addModal.closeModal} title="Add Permission">
        <PermissionForm onSubmit={handleAdd} />
      </Modal>

      <Modal isOpen={editModal.isOpen} onClose={editModal.closeModal} title="Edit Permission">
        <PermissionForm onSubmit={handleEdit} initialData={selectedPermission} />
      </Modal>
    </div>
  );
}