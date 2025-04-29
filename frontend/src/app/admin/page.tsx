'use client';

import Link from 'next/link';
import {
    FiUsers,
    FiFileText,
    FiBookOpen,
    FiActivity,
    FiArrowUp,
    FiArrowDown
} from 'react-icons/fi';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
                            alt="Admin Avatar"
                            className="w-12 h-12 rounded-full shadow"
                        />
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Total Users Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">1,234</p>
                            </div>
                            <div className="bg-blue-100 rounded-full p-3">
                                <FiUsers className="text-blue-500 text-2xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <FiArrowUp className="mr-1" />
                            <span>+12.5%</span>
                            <span className="text-gray-400 ml-2">from last month</span>
                        </div>
                    </div>
                    {/* Active Tests Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Tests</p>
                                <p className="text-2xl font-bold text-gray-900">45</p>
                            </div>
                            <div className="bg-green-100 rounded-full p-3">
                                <FiFileText className="text-green-500 text-2xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <FiArrowUp className="mr-1" />
                            <span>+8.2%</span>
                            <span className="text-gray-400 ml-2">from last month</span>
                        </div>
                    </div>
                    {/* Blog Posts Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                                <p className="text-2xl font-bold text-gray-900">28</p>
                            </div>
                            <div className="bg-purple-100 rounded-full p-3">
                                <FiBookOpen className="text-purple-500 text-2xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-red-600">
                            <FiArrowDown className="mr-1" />
                            <span>-2.4%</span>
                            <span className="text-gray-400 ml-2">from last month</span>
                        </div>
                    </div>
                    {/* Test Attempts Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Test Attempts</p>
                                <p className="text-2xl font-bold text-gray-900">2.4k</p>
                            </div>
                            <div className="bg-orange-100 rounded-full p-3">
                                <FiActivity className="text-orange-500 text-2xl" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-green-600">
                            <FiArrowUp className="mr-1" />
                            <span>+18.7%</span>
                            <span className="text-gray-400 ml-2">from last month</span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-200" />

                {/* Management Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Test Management Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Test Management</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Active Tests</p>
                                <p className="font-semibold">45</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Total Questions</p>
                                <p className="font-semibold">1.2k</p>
                            </div>
                            <Link
                                href="/admin/tests"
                                className="block mt-4 text-center py-2 px-4 bg-blue-700 rounded-lg font-bold shadow hover:bg-blue-900 transition"
                            >
                                Manage Tests
                            </Link>
                        </div>
                    </div>
                    {/* Blog Management Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Blog Management</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Published</p>
                                <p className="font-semibold">28</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Draft</p>
                                <p className="font-semibold">5</p>
                            </div>
                            <Link
                                href="/admin/blogs"
                                className="block mt-4 text-center py-2 px-4 bg-purple-700 rounded-lg font-bold shadow hover:bg-purple-900 transition"
                            >
                                Manage Blogs
                            </Link>
                        </div>
                    </div>
                    {/* User Management Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Total Users</p>
                                <p className="font-semibold">1,234</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600">Active Today</p>
                                <p className="font-semibold">156</p>
                            </div>
                            <Link
                                href="/admin/users"
                                className="block mt-4 text-center py-2 px-4 bg-green-700 rounded-lg font-bold shadow hover:bg-green-900 transition"
                            >
                                Manage Users
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}