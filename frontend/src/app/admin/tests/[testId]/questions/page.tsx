'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Question = {
    id: string;
    content: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
};

export default function TestQuestions() {
    const params = useParams();
    const testId = params.testId as string;

    const [questions, setQuestions] = useState<Question[]>([
        {
            id: '1',
            content: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2, // Index of correct answer (Paris)
            explanation: 'Paris is the capital city of France.'
        },
        {
            id: '2',
            content: 'Which word is a verb?',
            options: ['Happy', 'Run', 'Blue', 'Quick'],
            correctAnswer: 1, // Index of correct answer (Run)
            explanation: 'Run is a verb, while the others are adjectives.'
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [formData, setFormData] = useState<Omit<Question, 'id'>>({
        content: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingQuestion) {
            setQuestions(questions.map(q =>
                q.id === editingQuestion.id ? { ...formData, id: q.id } : q
            ));
        } else {
            setQuestions([...questions, { ...formData, id: Date.now().toString() }]);
        }
        setShowForm(false);
        setEditingQuestion(null);
        setFormData({ content: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Link
                        href="/admin/tests"
                        className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
                    >
                        ← Back to Tests
                    </Link>
                    <h1 className="text-3xl font-bold">Test Questions</h1>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Question
                </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
                {questions.map((question, index) => (
                    <div key={question.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                            <div className="space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingQuestion(question);
                                        setFormData(question);
                                        setShowForm(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setQuestions(questions.filter(q => q.id !== question.id))}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <p className="mb-4">{question.content}</p>
                        <div className="ml-4 mb-4">
                            {question.options.map((option, optIndex) => (
                                <div
                                    key={optIndex}
                                    className={`p-2 ${optIndex === question.correctAnswer ? 'text-green-600 font-semibold' : ''}`}
                                >
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                </div>
                            ))}
                        </div>
                        <div className="text-gray-600 text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                        </div>
                    </div>
                ))}
            </div>

            {/* Question Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingQuestion ? 'Edit Question' : 'Add New Question'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Question
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Options
                                </label>
                                {formData.options.map((option, index) => (
                                    <div key={index} className="mb-2">
                                        <div className="flex items-center">
                                            <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...formData.options];
                                                    newOptions[index] = e.target.value;
                                                    setFormData({ ...formData, options: newOptions });
                                                }}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Correct Answer
                                </label>
                                <select
                                    value={formData.correctAnswer}
                                    onChange={(e) => setFormData({ ...formData, correctAnswer: Number(e.target.value) })}
                                    className="w-full p-2 border rounded"
                                >
                                    {formData.options.map((_, index) => (
                                        <option key={index} value={index}>
                                            {String.fromCharCode(65 + index)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Explanation
                                </label>
                                <textarea
                                    value={formData.explanation}
                                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingQuestion(null);
                                        setFormData({ content: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' });
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {editingQuestion ? 'Save Changes' : 'Add Question'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}