import { Response, Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware, { checkUserRole } from "@/middlewares/auth.middleware";
import { UserRole } from "@shared/types/user.role";
import { RequestWithUser } from "@shared/interfaces/auth.interface";

class ParentsRoute implements Routes {
  public path = "/parent";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      checkUserRole(UserRole.PARENT),
      (req: RequestWithUser, res: Response) => {
        res.status(200).json({ message: "Parent dashboard" });
      }
    );
  }
}

export default ParentsRoute;
