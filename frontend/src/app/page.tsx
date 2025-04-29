import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">English Test App</a>
          <div>
            <a className="nav-link d-inline text-secondary" href="/tests">Practice</a>
            <a className="nav-link d-inline text-secondary" href="/about">About</a>
            <a className="nav-link d-inline text-secondary" href="/auth/login">Login</a>
            <a className="btn btn-primary ms-2" href="/auth/register">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-center py-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Practice English Tests <span className="text-primary">Online</span>
          </h1>
          <p className="lead text-secondary mb-4">
            Prepare for IELTS, TOEIC, and TOEFL with real exam questions, instant feedback, and detailed analytics. Join thousands of learners improving their English every day!
          </p>
          <a href="/tests" className="btn btn-primary btn-lg">Start Practicing</a>
        </div>
        <div className="col-md-5 offset-md-1">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold text-dark mb-3">Why Choose Us?</h5>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2">✔ Real exam interface & timer</li>
                <li className="mb-2">✔ Instant scoring & feedback</li>
                <li className="mb-2">✔ Detailed analytics & progress tracking</li>
                <li>✔ Free and unlimited practice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">Real Exam Experience</h5>
                <p className="card-text text-secondary">Timed tests, authentic questions, and a modern interface to simulate the real exam environment.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">Instant Feedback</h5>
                <p className="card-text text-secondary">Get your score and detailed explanations immediately after each test.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">Track Your Progress</h5>
                <p className="card-text text-secondary">See your improvement over time with analytics and personalized recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-top mt-auto py-3">
        <div className="container text-center text-secondary small">
          &copy; {new Date().getFullYear()} English Test App. All rights reserved.
        </div>
      </footer>
    </main>
  );
}