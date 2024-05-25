export interface User {
  [x: string]: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  MEMBER = "member",
  CONTENT_MANAGER = "content manager",
  STORE_MANAGER = "store manager",
  ADMIN = "admin",
}
