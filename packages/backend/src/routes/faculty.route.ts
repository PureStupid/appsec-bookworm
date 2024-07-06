import { Response, Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware, { checkUserRole } from "@/middlewares/auth.middleware";
import { UserRole } from "@/interfaces/users.interface";
import { RequestWithUser } from "@/interfaces/auth.interface";

class FacultyRoute implements Routes {
  public path = "/faculty";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      checkUserRole(UserRole.FACULTY),
      (req: RequestWithUser, res: Response) => {
        return res.send(`Hello ${req.user.name}`);
      }
    );
  }
}

export default FacultyRoute;
