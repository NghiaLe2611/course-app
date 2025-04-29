import { TestResult } from '../types/test';

export const mockTestResults: TestResult[] = [
    {
        id: '1',
        testName: 'TOEIC Practice Test 1',
        testType: 'TOEIC',
        score: 785,
        dateTaken: '2024-03-15',
        duration: 120,
        correctAnswers: 150,
        totalQuestions: 200
    },
    {
        id: '2',
        testName: 'IELTS Academic Test',
        testType: 'IELTS',
        score: 7.5,
        dateTaken: '2024-03-10',
        duration: 180,
        correctAnswers: 35,
        totalQuestions: 40
    },
    // Add more mock data...
];