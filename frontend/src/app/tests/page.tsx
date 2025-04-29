import Link from "next/link";

export default function Tests() {
    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Available Tests</h1>
            <ul style={{ fontSize: 18, marginLeft: 24 }}>
                <li style={{ marginBottom: 12 }}>
                    <Link href="/tests/toeic" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        TOEIC Test
                    </Link>
                </li>
                <li>
                    <Link href="/tests/ielts" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        IELTS Test
                    </Link>
                </li>
            </ul>
        </div>
    );
}