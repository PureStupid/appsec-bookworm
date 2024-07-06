import { UserRole } from "./user.role";

/**
 * User login body entity
 * @interface
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 * @property {UserRole} role - The user's role
 */
export interface UserLoginBody {
  email: string;
  password: string;
  role: UserRole;
}

/**
 * User login response entity
 * @interface
 * @property {string} message - The message of the response
 * @property {string} token - The token of the response
 *
 */
export interface UserLoginResponse {
  message: string;
  token: string;
}

interface error {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface UserLoginErrorResponse {
  errors: error[];
}

/**
 * User sign up body entity
 * @interface
 * @property {string} name - The user's name
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 * @property {UserRole} role - The user's role
 */
export interface UserSignUpBody {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserSignUpErrorResponse {
  errors: error[];
}

/**
 * User sign up response entity
 * @interface
 * @property {string} message - The message of the response
 * @property {string} token - The token of the response
 *
 */
export interface UserSignUpResponse {
  token: string;
  message: string;
}
