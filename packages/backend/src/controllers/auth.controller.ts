import { NextFunction, Request, Response } from "express";
import { CreateUserDto, UserDto } from "@dtos/users.dto";
import { UserRole } from "@shared/types/user.role";
import AuthService from "@services/auth.service";
import { RequestWithUser } from "@shared/interfaces/auth.interface";

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
      const user = await this.authService.signup(userData);

      res.status(201).json({
        message: "signup success",
        user: user.createUserData,
        token: user.token,
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = { ...req.body };
      const user = await this.authService.login(userData);

      res.status(200).json({
        message: "login success",
        user: user.findUser,
        token: user.token,
      });
    } catch (error) {
      next(error);
    }
  };

  public validateToken = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.status(200).json({ message: "token is valid", user: req.user });
    } catch (error) {
      next(error);
    }
  };

  public validateRecaptcha = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const msg = await this.authService.validateRecaptcha(req.body.token);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
