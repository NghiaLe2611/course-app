'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Validation schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError('');

        try {
            // Mock API call - replace with real API later
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation
            if (data.email === 'test@example.com' && data.password === 'password123') {
                router.push('/profile');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Login</h1>

            {error && (
                <div style={{
                    padding: "12px",
                    background: "#fee2e2",
                    border: "1px solid #ef4444",
                    borderRadius: 8,
                    color: "#dc2626",
                    marginBottom: 16
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        style={{
                            width: "100%",
                            padding: 8,
                            borderRadius: 6,
                            border: errors.email ? "1px solid #ef4444" : "1px solid #ccc"
                        }}
                    />
                    {errors.email && (
                        <span style={{ color: "#ef4444", fontSize: 14 }}>
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        style={{
                            width: "100%",
                            padding: 8,
                            borderRadius: 6,
                            border: errors.password ? "1px solid #ef4444" : "1px solid #ccc"
                        }}
                    />
                    {errors.password && (
                        <span style={{ color: "#ef4444", fontSize: 14 }}>
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        background: "#2563eb",
                        color: "#fff",
                        padding: "10px 0",
                        borderRadius: 8,
                        fontWeight: 600,
                        border: "none",
                        opacity: isLoading ? 0.7 : 1,
                        cursor: isLoading ? "not-allowed" : "pointer"
                    }}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p style={{ marginTop: 16, fontSize: 15 }}>
                Don't have an account?{" "}
                <Link href="/auth/register" style={{ color: "#2563eb", textDecoration: "underline" }}>
                    Register
                </Link>
            </p>
        </div>
    );
}