import React, { useState } from 'react';
import { roles as initialRoles } from '../data/mockData';
import { Role } from '../types';
import { Edit2, Trash2 } from 'lucide-react';
import { Modal } from './shared/Modal';
import { RoleForm } from './roles/RoleForm';
import { useModal } from '../hooks/useModal';

export function RolesView() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();
  const addModal = useModal();
  const editModal = useModal();

  const handleAdd = (data: Partial<Role>) => {
    const newRole: Role = {
      id: String(roles.length + 1),
      ...data,
    } as Role;
    setRoles([...roles, newRole]);
    addModal.closeModal();
  };

  const handleEdit = (data: Partial<Role>) => {
    if (!selectedRole) return;
    const updatedRoles = roles.map(role =>
      role.id === selectedRole.id ? { ...role, ...data } : role
    );
    setRoles(updatedRoles);
    editModal.closeModal();
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Roles</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage roles and their associated permissions
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={addModal.openModal}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add role
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      editModal.openModal();
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">{role.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Permissions</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {permission.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={addModal.isOpen} onClose={addModal.closeModal} title="Add Role">
        <RoleForm onSubmit={handleAdd} />
      </Modal>

      <Modal isOpen={editModal.isOpen} onClose={editModal.closeModal} title="Edit Role">
        <RoleForm onSubmit={handleEdit} initialData={selectedRole} />
      </Modal>
    </div>
  );
}