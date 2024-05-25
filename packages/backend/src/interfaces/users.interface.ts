export interface User {
  [x: string]: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  MEMBER = "member",
  STORE_MANAGER = "store manager",
  CUSTOMER_SERVICE_MANAGER = "customer service manager",
  ADMIN = "admin",
}
