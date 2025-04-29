export type TestResult = {
    id: string;
    testName: string;
    testType: 'TOEIC' | 'IELTS' | 'TOEFL';
    score: number;
    dateTaken: string;
    duration: number; // in minutes
    correctAnswers: number;
    totalQuestions: number;
};