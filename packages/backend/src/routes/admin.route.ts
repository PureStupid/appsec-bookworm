import { Response, Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware, { checkUserRole } from "@/middlewares/auth.middleware";
import { UserRole } from "@shared/types/user.role";
import { RequestWithUser } from "@shared/interfaces/auth.interface";

class AdminsRoute implements Routes {
  public path = "/admin";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      checkUserRole(UserRole.ADMIN),
      (req: RequestWithUser, res: Response) => {
        res.status(200).json({ message: "Admin dashboard" });
      }
    );
  }
}

export default AdminsRoute;
