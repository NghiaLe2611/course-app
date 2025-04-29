export default function About() {
    return (
        <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>About This Platform</h1>
            <p style={{ fontSize: 18, color: "#444", marginBottom: 24 }}>
                This platform helps you practice and improve your English skills for international exams like TOEIC and IELTS.
            </p>
            <div style={{ fontSize: 16, margin: "16px 0 24px 0" }}>
                <strong>Features:</strong>
                <ul style={{ margin: "8px 0 8px 24px" }}>
                    <li>Take realistic English tests online</li>
                    <li>Get instant feedback and detailed explanations</li>
                    <li>Track your progress over time</li>
                    <li>Read blogs and tips to boost your learning</li>
                    <li>Admins can manage tests, questions, blogs, and users</li>
                </ul>
            </div>
            <p style={{ fontSize: 16, color: "#666" }}>
                Whether you are a student, teacher, or administrator, this platform is designed to make English test preparation easy and effective.<br /><br />
                If you have any questions or feedback, please contact us!
            </p>
        </div>
    );
}