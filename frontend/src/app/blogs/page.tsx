import Link from "next/link";

export default function Blogs() {
    // Example blog data (replace with real data or fetch from API later)
    const blogs = [
        { id: "1", title: "How to Prepare for TOEIC" },
        { id: "2", title: "IELTS Listening Tips" },
        { id: "3", title: "Common English Grammar Mistakes" },
    ];

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Blogs</h1>
            <ul style={{ fontSize: 18, marginLeft: 24 }}>
                {blogs.map((blog) => (
                    <li key={blog.id} style={{ marginBottom: 12 }}>
                        <Link href={`/blogs/${blog.id}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
                            {blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}