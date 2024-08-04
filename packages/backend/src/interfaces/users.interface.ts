import { UserRole } from "@shared/types/user.role";

export interface User {
  [x: string]: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface PartialUser {
  [x: string]: string;
  name: string;
  email: string;
  role: UserRole;
}
