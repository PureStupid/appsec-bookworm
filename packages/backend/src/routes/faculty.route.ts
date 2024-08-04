import { Response, Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware, { checkUserRole } from "@/middlewares/auth.middleware";
import { UserRole } from "@shared/types/user.role";
import { RequestWithUser } from "@shared/interfaces/auth.interface";

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
        res.status(200).json({ message: "Faculty dashboard" });
      }
    );
  }
}

export default FacultyRoute;
