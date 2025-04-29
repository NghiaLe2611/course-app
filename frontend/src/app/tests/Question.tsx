'use client';

interface QuestionProps {
    question: {
        id: number;
        type: string;
        question: string;
        image?: string;
        audio?: string;
        options: Array<{
            id: string;
            text: string;
        }>;
    };
    selectedAnswer: string | undefined;
    onAnswer: (answer: string) => void;
}

export default function Question({ question, selectedAnswer, onAnswer }: QuestionProps) {
    return (
        <div>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
                {question.question}
            </h2>

            {question.image && (
                <div style={{ marginBottom: '16px' }}>
                    <img
                        src={question.image}
                        alt="Question Image"
                        style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                </div>
            )}

            {question.audio && (
                <div style={{ marginBottom: '16px' }}>
                    <audio controls>
                        <source src={question.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {question.options.map(option => (
                    <label
                        key={option.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            border: selectedAnswer === option.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: selectedAnswer === option.id ? '#eff6ff' : 'white'
                        }}
                    >
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id}
                            checked={selectedAnswer === option.id}
                            onChange={() => onAnswer(option.id)}
                            style={{ marginRight: '12px' }}
                        />
                        <span>
                            <strong>{option.id}.</strong> {option.text}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}