import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { studentApi } from "../api/studentApi";
import type { StudentInput } from "../types/Student";

const emptyStudent: StudentInput = { name: "", email: "", age: 18, course: "" };

export default function StudentForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState<StudentInput>(emptyStudent);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    studentApi.getById(Number(id))
      .then(({ name, email, age, course }) => setForm({ name, email, age, course }))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load student."))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "age" ? Number(value) : value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isEditing) await studentApi.update(Number(id), form);
      else await studentApi.create(form);
      navigate("/students");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save student.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="form-page">Loading student...</main>;

  return (
    <main className="form-page">
      <Link to="/students" className="back-link">← Back to students</Link>
      <section className="form-card">
        <span className="eyebrow">{isEditing ? "EDIT RECORD" : "NEW RECORD"}</span>
        <h1>{isEditing ? "Update student" : "Add a student"}</h1>
        <p className="form-description">Enter the student's details below.</p>

        {error && <div className="error-message" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange}
            placeholder="e.g. Rahul Sharma" maxLength={100} required />

          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="rahul@example.com" required />

          <div className="form-row">
            <div>
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="number" min={1} value={form.age}
                onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="course">Course</label>
              <input id="course" name="course" value={form.course} onChange={handleChange}
                placeholder="e.g. Computer Science" required />
            </div>
          </div>

          <button className="primary-button form-submit" type="submit" disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Student"}
          </button>
        </form>
      </section>
    </main>
  );
}
