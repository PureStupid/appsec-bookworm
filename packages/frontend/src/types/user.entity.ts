import { UserRole } from "../../../shared/types/user.role";
import { TokenData } from "../../../shared/interfaces/auth.interface";

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

export interface UserData {
  name: string;
  email: string;
  role: UserRole | "";
}

/**
 * User login response entity
 * @interface
 * @property {string} message - The message of the response
 * @property {UserData} user - The user of the response
 * @property {string} token - The token of the response
 *
 */
export interface UserLoginResponse {
  message: string;
  user: UserData;
  token: TokenData;
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
 * @property {UserData} user - The user of the response
 * @property {string} token - The token of the response
 *
 */
export interface UserSignUpResponse {
  token: string;
  user: UserData;
  message: string;
}
