'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

interface TimerProps {
    initialTime: number;
    onTimeUpdate: (time: number) => void;
}

export default function Timer({ initialTime, onTimeUpdate }: TimerProps) {
    const params = useParams();
    const testId = params.testId as string;

    useEffect(() => {
        const interval = setInterval(() => {
            onTimeUpdate(initialTime > 0 ? initialTime - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [initialTime, onTimeUpdate]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: initialTime < 300 ? '#ef4444' : '#000'
        }}>
            {formatTime(initialTime)}
        </div>
    );
}