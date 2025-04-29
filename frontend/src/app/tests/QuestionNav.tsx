'use client';

interface QuestionNavProps {
    totalQuestions: number;
    currentQuestion: number;
    answers: Record<number, string>;
    onNavigate: (index: number) => void;
}

export default function QuestionNav({
    totalQuestions,
    currentQuestion,
    answers,
    onNavigate
}: QuestionNavProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
            gap: '8px',
            padding: '16px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px #0001'
        }}>
            {Array.from({ length: totalQuestions }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onNavigate(i)}
                    style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: currentQuestion === i ? '2px solid #2563eb' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        background: answers[i + 1] ? '#dcfce7' : 'white',
                        cursor: 'pointer'
                    }}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}