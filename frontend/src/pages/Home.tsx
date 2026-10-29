import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <span className="eyebrow">STUDENT MANAGEMENT SYSTEM</span>
        <h1>Manage your students.<br /><span>Keep everything organized.</span></h1>
        <p>
          A simple place to view student information, add new students,
          and manage academic records with ease.
        </p>
        <div className="hero-actions">
          <Link to="/students" className="primary-button">View Students →</Link>
          <Link to="/students/add" className="secondary-button">+ Add a Student</Link>
        </div>
        <div className="hero-note"><span className="status-dot" />Simple. Organized. Easy to use.</div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <span className="feature-icon">01</span>
          <h3>Student Records</h3>
          <p>View student details in clear, organized cards.</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">02</span>
          <h3>Easy Updates</h3>
          <p>Edit names, email addresses, ages, and courses.</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">03</span>
          <h3>Quick Actions</h3>
          <p>Add new students or remove outdated records.</p>
        </article>
      </section>
    </main>
  );
}
