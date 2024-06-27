import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/users.dto";
import { RequestWithUser } from "@interfaces/auth.interface";
import { User, UserRole } from "@interfaces/users.interface";
import AuthService from "@services/auth.service";

class AuthController {
  public authService = new AuthService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
    role: UserRole
  ) => {
    try {
      const userData: CreateUserDto = { ...req.body, role };
      await this.authService.signup(userData);

      res.status(201).json({ message: "signup success" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
    role: UserRole
  ) => {
    try {
      const userData: CreateUserDto = { ...req.body, role };
      const user = await this.authService.login(userData);

      res.status(200).json({ message: "login success", token: user.token });
    } catch (error) {
      next(error);
    }
  };

  // TODO: Implement the logOut method
  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.user;
      await this.authService.logout(userData);

      res.status(200).json({ message: "logout success" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
