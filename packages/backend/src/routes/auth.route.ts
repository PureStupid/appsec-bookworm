import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import { CreateUserDto, UserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import { UserRole } from "@shared/types/user.role";
import authMiddleware from "@/middlewares/auth.middleware";
import { RequestWithUser } from "@shared/interfaces/auth.interface";
import rateLimit from "express-rate-limit";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();
  readonly loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
      message: "Too many login attempts, please try again after 15 minutes",
    },
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}validate-token`,
      authMiddleware,
      (req: RequestWithUser, res, next) =>
        this.authController.validateToken(req, res, next)
    ),
      this.router.post(`${this.path}validate-recaptcha`, (req, res, next) =>
        this.authController.validateRecaptcha(req, res, next)
      ),
      this.router.post(
        `${this.path}signup-student`,
        validationMiddleware(CreateUserDto, "body"),
        (req, res, next) =>
          this.authController.signUp(req, res, next, UserRole.STUDENT)
      ),
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
      this.loginLimiter,
      validationMiddleware(UserDto, "body"),
      (req, res, next) => this.authController.logIn(req, res, next)
    );
    this.router.post(
      `${this.path}login-faculty`,
      this.loginLimiter,
      validationMiddleware(UserDto, "body"),
      (req, res, next) => this.authController.logIn(req, res, next)
    );
    this.router.post(
      `${this.path}login-parent`,
      this.loginLimiter,
      validationMiddleware(UserDto, "body"),
      (req, res, next) => this.authController.logIn(req, res, next)
    );
    this.router.post(
      `${this.path}login-admin`,
      this.loginLimiter,
      validationMiddleware(UserDto, "body"),
      (req, res, next) => this.authController.logIn(req, res, next)
    );
  }
}

export default AuthRoute;
