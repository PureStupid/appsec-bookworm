import { UserRole } from "../types/user.role";

export interface User {
  [x: string]: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
