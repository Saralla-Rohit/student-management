import type { Student, StudentInput } from "../types/Student";

const API_URL = "http://localhost:8080/api/students";

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204 || options?.method === "DELETE") {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const studentApi = {
  getAll: () => request<Student[]>(API_URL),

  getById: (id: number) =>
    request<Student>(`${API_URL}/${id}`),

  create: (student: StudentInput) =>
    request<Student>(API_URL, {
      method: "POST",
      body: JSON.stringify(student),
    }),

  update: (id: number, student: StudentInput) =>
    request<Student>(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(student),
    }),

  delete: (id: number) =>
    request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    }),
};
