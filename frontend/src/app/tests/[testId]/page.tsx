import Link from "next/link";

export default function TestDetail({ params }: { params: { testId: string } }) {
    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                {params.testId.toUpperCase()} Test Details
            </h1>
            <p style={{ fontSize: 18, color: "#444", marginBottom: 24 }}>
                Information about the {params.testId.toUpperCase()} test will be shown here.
            </p>
            <Link
                href={`/tests/${params.testId}/take`}
                style={{ background: "#2563eb", color: "#fff", padding: "10px 24px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}
            >
                Start Test
            </Link>
        </div>
    );
}