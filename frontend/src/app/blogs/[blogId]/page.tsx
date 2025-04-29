import Link from "next/link";

export default function BlogDetail({ params }: { params: { blogId: string } }) {
    // Example blog content (replace with real data or fetch from API later)
    const blogContent: { [key: string]: { title: string; content: string } } = {
        "1": { title: "How to Prepare for TOEIC", content: "Here are some tips and strategies to help you prepare for the TOEIC exam..." },
        "2": { title: "IELTS Listening Tips", content: "Improve your IELTS listening skills with these practical tips..." },
        "3": { title: "Common English Grammar Mistakes", content: "Avoid these common grammar mistakes to boost your English proficiency..." }
    };

    const blog = blogContent[params.blogId] || {
        title: "Blog Not Found",
        content: "Sorry, the blog post you are looking for does not exist."
    };

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>{blog.title}</h1>
            <p style={{ fontSize: 18, color: "#444", marginBottom: 24 }}>{blog.content}</p>
            <Link href="/blogs" style={{ color: "#2563eb", textDecoration: "underline" }}>
                Back to Blogs
            </Link>
        </div>
    );
}