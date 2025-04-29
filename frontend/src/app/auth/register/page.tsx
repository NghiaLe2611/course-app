'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Validation schema
const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError('');

        try {
            // Mock API call - replace with real API later
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock registration success
            router.push('/auth/login?registered=true');
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "60px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Register</h1>

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
                    <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        style={{
                            width: "100%",
                            padding: 8,
                            borderRadius: 6,
                            border: errors.name ? "1px solid #ef4444" : "1px solid #ccc"
                        }}
                    />
                    {errors.name && (
                        <span style={{ color: "#ef4444", fontSize: 14 }}>
                            {errors.name.message}
                        </span>
                    )}
                </div>

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

                <div style={{ marginBottom: 16 }}>
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

                <div style={{ marginBottom: 24 }}>
                    <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: 4 }}>
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword')}
                        style={{
                            width: "100%",
                            padding: 8,
                            borderRadius: 6,
                            border: errors.confirmPassword ? "1px solid #ef4444" : "1px solid #ccc"
                        }}
                    />
                    {errors.confirmPassword && (
                        <span style={{ color: "#ef4444", fontSize: 14 }}>
                            {errors.confirmPassword.message}
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
                    {isLoading ? "Creating account..." : "Register"}
                </button>
            </form>

            <p style={{ marginTop: 16, fontSize: 15 }}>
                Already have an account?{" "}
                <Link href="/auth/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
                    Login
                </Link>
            </p>
        </div>
    );
}