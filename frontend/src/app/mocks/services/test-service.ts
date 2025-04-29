import { TestResult } from '../types/test';

const mockTestResults: TestResult[] = [
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
    {
        id: '3',
        testName: 'TOEFL iBT Sample Test',
        testType: 'TOEFL',
        score: 98,
        dateTaken: '2024-03-05',
        duration: 240,
        correctAnswers: 88,
        totalQuestions: 100
    }
];

export const TestService = {
    getTestResults: async (): Promise<TestResult[]> => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        return mockTestResults;
    }
};