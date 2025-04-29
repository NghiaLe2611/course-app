'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionNav from '../../QuestionNav';
import Timer from '../../Timer';
import Question from '../../Question';
// Mock test data (replace with API call later)
const mockTest = {
    id: 'toeic',
    title: 'TOEIC Practice Test',
    timeLimit: 7200, // 2 hours in seconds
    questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: 'What is the man doing in the picture?',
            image: '/sample-image-1.jpg',
            audio: '/sample-audio-1.mp3',
            options: [
                { id: 'A', text: 'Reading a newspaper' },
                { id: 'B', text: 'Writing a letter' },
                { id: 'C', text: 'Using a computer' },
                { id: 'D', text: 'Making a phone call' }
            ]
        },
        {
            id: 2,
            type: 'multiple-choice',
            question: 'Where is the meeting taking place?',
            options: [
                { id: 'A', text: 'In a conference room' },
                { id: 'B', text: 'In a restaurant' },
                { id: 'C', text: 'In an office' },
                { id: 'D', text: 'In a hotel' }
            ]
        },
        // Add more questions as needed
    ]
};

export default function TestTaking({ params }: { params: { testId: string } }) {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeRemaining, setTimeRemaining] = useState(mockTest.timeLimit);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle time up
    useEffect(() => {
        if (timeRemaining === 0) {
            handleSubmitTest();
        }
    }, [timeRemaining]);

    // Save answers to localStorage
    useEffect(() => {
        if (Object.keys(answers).length > 0) {
            localStorage.setItem(`test_${params.testId}_answers`, JSON.stringify(answers));
        }
    }, [answers, params.testId]);

    // Load saved answers from localStorage
    useEffect(() => {
        const savedAnswers = localStorage.getItem(`test_${params.testId}_answers`);
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, [params.testId]);

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < mockTest.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmitTest = async () => {
        setIsSubmitting(true);
        try {
            // Mock API call - replace with real API later
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Clear localStorage
            localStorage.removeItem(`test_${params.testId}_answers`);

            // Redirect to results page
            router.push(`/tests/${params.testId}/result`);
        } catch (error) {
            console.error('Error submitting test:', error);
            setIsSubmitting(false);
        }
    };

    const currentQuestion = mockTest.questions[currentQuestionIndex];
    const totalQuestions = mockTest.questions.length;
    const answeredQuestions = Object.keys(answers).length;

    return (
        <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
            {/* Timer */}
            <div style={{
                position: 'sticky',
                top: 0,
                background: 'white',
                padding: '10px 0',
                borderBottom: '1px solid #eee',
                zIndex: 10
            }}>
                <Timer
                    initialTime={timeRemaining}
                    onTimeUpdate={setTimeRemaining}
                />
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 20 }}>
                <p>Question {currentQuestionIndex + 1} of {totalQuestions}</p>
                <p>Answered: {answeredQuestions} of {totalQuestions}</p>
            </div>

            {/* Question */}
            <div style={{
                background: 'white',
                padding: 24,
                borderRadius: 12,
                boxShadow: '0 2px 8px #0001',
                marginBottom: 20
            }}>
                <Question
                    question={currentQuestion}
                    selectedAnswer={answers[currentQuestion.id]}
                    onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
                />
            </div>

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 20
            }}>
                <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    style={{
                        padding: '10px 20px',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: 8,
                        cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                        opacity: currentQuestionIndex === 0 ? 0.5 : 1
                    }}
                >
                    Previous
                </button>

                {currentQuestionIndex === totalQuestions - 1 ? (
                    <button
                        onClick={handleSubmitTest}
                        disabled={isSubmitting}
                        style={{
                            padding: '10px 20px',
                            background: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.5 : 1
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Test'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        style={{
                            padding: '10px 20px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer'
                        }}
                    >
                        Next
                    </button>
                )}
            </div>

            {/* Question Navigation */}
            <QuestionNav
                totalQuestions={totalQuestions}
                currentQuestion={currentQuestionIndex}
                answers={answers}
                onNavigate={setCurrentQuestionIndex}
            />
        </div>
    );
}