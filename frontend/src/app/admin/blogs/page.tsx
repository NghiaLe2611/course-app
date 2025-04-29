'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit2, FiTrash2, FiArrowLeft, FiEye, FiPlus } from 'react-icons/fi';

interface Blog {
    id: string;
    title: string;
    content: string;
    status: 'draft' | 'published';
    author: string;
    category: string;
    tags: string[];
    createdAt: string;
    readTime: number;
    views: number;
}

export default function BlogManagement() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [filter, setFilter] = useState({ status: 'all', category: 'all' });

    const [formData, setFormData] = useState<Partial<Blog>>({
        title: '',
        content: '',
        status: 'draft',
        category: '',
        tags: [],
    });

    const stats = {
        total: blogs.length,
        published: blogs.filter(b => b.status === 'published').length,
        totalViews: blogs.reduce((acc, blog) => acc + blog.views, 0),
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
                <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700">Total Blogs</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700">Published</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.published}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700">Total Views</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalViews}</p>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <select
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <select
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                        >
                            <option value="all">All Categories</option>
                            <option value="grammar">Grammar</option>
                            <option value="vocabulary">Vocabulary</option>
                            <option value="tips">Test Tips</option>
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            setEditingBlog(null);
                            setFormData({});
                            setShowForm(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <FiPlus className="mr-2" /> New Blog
                    </button>
                </div>
            </div>

            {/* Blog List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-gray-900">{blog.title}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(blog.createdAt).toLocaleDateString()} • {blog.readTime} min read
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
                                        {blog.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-sm rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-900">{blog.views}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingBlog(blog);
                                                setFormData(blog);
                                                setShowForm(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => {/* Handle preview */ }}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            <FiEye />
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
                    <div className="bg-white rounded-lg max-w-3xl w-full mx-4">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
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
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Content
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={8}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="grammar">Grammar</option>
                                            <option value="vocabulary">Vocabulary</option>
                                            <option value="tips">Test Tips</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                            required
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingBlog(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                >
                                    {editingBlog ? 'Save Changes' : 'Create Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}