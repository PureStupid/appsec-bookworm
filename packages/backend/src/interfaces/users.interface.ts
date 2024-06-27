export interface User {
  [x: string]: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  STUDENT = "student",
  FACULTY = "faculty",
  PARENT = "parent",
  ADMIN = "admin",
}
