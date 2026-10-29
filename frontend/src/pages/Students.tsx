import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { studentApi } from "../api/studentApi";
import type { Student } from "../types/Student";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadStudents() {
    try {
      setError("");
      const data = await studentApi.getAll();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadStudents();
  }, []);

  async function handleDelete(student: Student) {
    if (!window.confirm(`Delete ${student.name}'s record?`)) return;

    try {
      await studentApi.delete(student.id);
      setStudents((current) => current.filter((item) => item.id !== student.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete student.");
    }
  }

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <span className="eyebrow">DIRECTORY</span>
          <h1>Students</h1>
          <p>Manage all your student records in one place.</p>
        </div>
        <Link to="/students/add" className="primary-button">+ Add Student</Link>
      </section>

      <section className="student-toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search by name, email, or course..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search students"
        />
        <span className="student-count">
          {filteredStudents.length} student{filteredStudents.length === 1 ? "" : "s"}
        </span>
      </section>

      {error && (
        <div className="error-message" role="alert">
          {error} <button onClick={() => void loadStudents()}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="empty-state">Loading students...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♙</div>
          <h2>{search ? "No matching students" : "No students yet"}</h2>
          <p>{search ? "Try a different search term." : "Add your first student to get started."}</p>
          {!search && <Link to="/students/add" className="primary-button">Add your first student</Link>}
        </div>
      ) : (
        <section className="student-grid">
          {filteredStudents.map((student) => (
            <article className="student-card" key={student.id}>
              <div className="student-card-top">
                <div className="avatar">{student.name.trim().charAt(0).toUpperCase()}</div>
                <span className="student-id">ID #{student.id}</span>
              </div>
              <h2>{student.name}</h2>
              <p className="student-email">{student.email}</p>
              <div className="student-details">
                <div><span>AGE</span><strong>{student.age} years</strong></div>
                <div><span>COURSE</span><strong>{student.course}</strong></div>
              </div>
              <div className="card-actions">
                <Link to={`/students/edit/${student.id}`} className="edit-button">✎ Update</Link>
                <button className="delete-button" onClick={() => void handleDelete(student)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
