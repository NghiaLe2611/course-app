'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit2, FiTrash2, FiArrowLeft, FiUserPlus, FiShield, FiUser, FiUsers } from 'react-icons/fi';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    status: 'active' | 'inactive' | 'suspended';
    joinedDate: string;
    lastLogin: string;
    testsCompleted: number;
    averageScore: number;
}

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [filter, setFilter] = useState({ role: 'all', status: 'all' });

    const [formData, setFormData] = useState<Partial<User>>({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
    });

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        admins: users.filter(u => u.role === 'admin').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <FiArrowLeft className="mr-2" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FiUsers className="text-blue-500 text-2xl mr-3" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FiUser className="text-green-500 text-2xl mr-3" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FiShield className="text-purple-500 text-2xl mr-3" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Administrators</h3>
                            <p className="text-3xl font-bold text-purple-600">{stats.admins}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <select
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filter.role}
                            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="user">User</option>
                        </select>
                        <select
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            setEditingUser(null);
                            setFormData({});
                            setShowForm(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <FiUserPlus className="mr-2" /> Add User
                    </button>
                </div>
            </div>

            {/* User List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-sm rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-sm rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                                            user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        Tests: {user.testsCompleted}
                                        <br />
                                        Avg Score: {user.averageScore}%
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingUser(user);
                                                setFormData(user);
                                                setShowForm(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => {/* Handle delete */ }}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingUser ? 'Edit User' : 'Add New User'}
                            </h2>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            // Handle form submission
                            setShowForm(false);
                        }} className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                                            required
                                        >
                                            <option value="user">User</option>
                                            <option value="moderator">Moderator</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                                            required
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="suspended">Suspended</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingUser(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                >
                                    {editingUser ? 'Save Changes' : 'Add User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}