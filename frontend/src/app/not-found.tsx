import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: 100 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>404 - Page Not Found</h1>
            <p style={{ fontSize: 20, marginBottom: 32 }}>Sorry, the page you are looking for does not exist.</p>
            <Link href="/" style={{ color: "#2563eb", fontWeight: 500, textDecoration: "underline" }}>
                Go back home
            </Link>
        </div>
    );
}