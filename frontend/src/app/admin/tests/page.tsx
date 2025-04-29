'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit2, FiTrash2, FiList, FiArrowLeft } from 'react-icons/fi';

type Test = {
    id: string;
    name: string;
    type: 'TOEIC' | 'IELTS' | 'TOEFL';
    duration: number;
    questions: number;
    lastUpdated: string;
    status: 'active' | 'draft';
    attempts: number;
    avgScore: number;
};

export default function TestManagement() {
    const [tests, setTests] = useState<Test[]>([
        {
            id: '1',
            name: 'TOEIC Practice Test 1',
            type: 'TOEIC',
            duration: 120,
            questions: 200,
            lastUpdated: '2024-03-15',
            status: 'active',
            attempts: 156,
            avgScore: 78.5
        },
        {
            id: '2',
            name: 'IELTS Academic Test',
            type: 'IELTS',
            duration: 180,
            questions: 40,
            lastUpdated: '2024-03-10',
            status: 'draft',
            attempts: 0,
            avgScore: 0
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingTest, setEditingTest] = useState<Test | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'TOEIC',
        status: 'active',
        duration: 0,
        questions: 0,
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTest) {
            // Handle update
        } else {
            // Handle create
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center">
                        <Link href="/admin" className="text-gray-600 hover:text-gray-900 mr-4">
                            <FiArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Test Management</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Tests</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{tests.length}</p>
                        <div className="mt-2 text-sm text-gray-600">
                            {tests.filter(t => t.status === 'active').length} active tests
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Questions</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {tests.reduce((sum, test) => sum + test.questions, 0)}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                            Across all tests
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Attempts</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {tests.reduce((sum, test) => sum + test.attempts, 0)}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                            By all users
                        </div>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <select className="bg-white border rounded-md px-3 py-2 text-sm">
                            <option value="all">All Types</option>
                            <option value="TOEIC">TOEIC</option>
                            <option value="IELTS">IELTS</option>
                            <option value="TOEFL">TOEFL</option>
                        </select>
                        <select className="bg-white border rounded-md px-3 py-2 text-sm">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                    >
                        <span className="mr-2">Add New Test</span>
                    </button>
                </div>

                {/* Tests List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Test Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statistics
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tests.map((test) => (
                                <tr key={test.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{test.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {test.type} • {test.duration} mins • {test.questions} questions
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Last updated: {test.lastUpdated}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{test.attempts} attempts</div>
                                        <div className="text-sm text-gray-500">
                                            Avg. Score: {test.avgScore}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${test.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {test.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-3">
                                            <Link
                                                href={`/admin/tests/${test.id}/questions`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <FiList className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setEditingTest(test);
                                                    setShowForm(true);
                                                }}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                <FiEdit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setTests(tests.filter(t => t.id !== test.id))}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingTest ? 'Edit Test' : 'Create New Test'}
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Test Name
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
                                        Test Type
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as Test['type'] })}
                                    >
                                        <option value="TOEIC">TOEIC</option>
                                        <option value="IELTS">IELTS</option>
                                        <option value="TOEFL">TOEFL</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'draft' })}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Questions
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.questions}
                                        onChange={(e) => setFormData({ ...formData, questions: parseInt(e.target.value) })}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingTest(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                >
                                    {editingTest ? 'Save Changes' : 'Create Test'}
            </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}