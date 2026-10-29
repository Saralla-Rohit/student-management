export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course: string;
}

export type StudentInput = Omit<Student, "id">;
