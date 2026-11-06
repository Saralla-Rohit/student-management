
import type { Student, StudentInput } from "../types/Student";

const API_URL = "http://localhost:8082/api/students";

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

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
  getAll: async () => {
    const response = await request<ApiResponse<Student[]>>(API_URL);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await request<ApiResponse<Student>>(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (student: StudentInput) => {
    const response = await request<ApiResponse<Student>>(API_URL, {
      method: "POST",
      body: JSON.stringify(student),
    });
    return response.data;
  },

  update: async (id: number, student: StudentInput) => {
    const response = await request<ApiResponse<Student>>(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(student),
    });
    return response.data;
  },

  delete: (id: number) =>
    request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    }),
};
