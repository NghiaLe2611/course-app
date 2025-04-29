import Link from "next/link";

export default function TestResult({ params }: { params: { testId: string } }) {
    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                {params.testId.toUpperCase()} Test - Result
            </h1>
            <p style={{ fontSize: 18, color: "#444", marginBottom: 24 }}>
                Your test results, answers, and explanations will be shown here.
            </p>
            <Link
                href="/tests"
                style={{ color: "#2563eb", textDecoration: "underline" }}
            >
                Back to Tests
            </Link>
        </div>
    );
}