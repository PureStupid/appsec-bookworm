import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import { CreateUserDto, UserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import { UserRole } from "@/interfaces/users.interface";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}signup-student`,
      validationMiddleware(CreateUserDto, "body"),
      (req, res, next) =>
        this.authController.signUp(req, res, next, UserRole.STUDENT)
    );
    this.router.post(
      `${this.path}signup-faculty`,
      validationMiddleware(CreateUserDto, "body"),
      (req, res, next) =>
        this.authController.signUp(req, res, next, UserRole.FACULTY)
    );
    this.router.post(
      `${this.path}signup-parent`,
      validationMiddleware(CreateUserDto, "body"),
      (req, res, next) =>
        this.authController.signUp(req, res, next, UserRole.PARENT)
    );
    this.router.post(
      `${this.path}signup-admin`,
      validationMiddleware(CreateUserDto, "body"),
      (req, res, next) =>
        this.authController.signUp(req, res, next, UserRole.ADMIN)
    );
    this.router.post(
      `${this.path}login-student`,
      validationMiddleware(UserDto, "body"),
      (req, res, next) =>
        this.authController.logIn(req, res, next, UserRole.STUDENT)
    );
    this.router.post(
      `${this.path}login-faculty`,
      validationMiddleware(UserDto, "body"),
      (req, res, next) =>
        this.authController.logIn(req, res, next, UserRole.FACULTY)
    );
    this.router.post(
      `${this.path}login-parent`,
      validationMiddleware(UserDto, "body"),
      (req, res, next) =>
        this.authController.logIn(req, res, next, UserRole.PARENT)
    );
    this.router.post(
      `${this.path}login-admin`,
      validationMiddleware(UserDto, "body"),
      (req, res, next) =>
        this.authController.logIn(req, res, next, UserRole.ADMIN)
    );
  }
}

export default AuthRoute;
