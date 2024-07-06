import { Response, Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware, { checkUserRole } from "@/middlewares/auth.middleware";
import { UserRole } from "@/interfaces/users.interface";
import { RequestWithUser } from "@/interfaces/auth.interface";

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
        return res.send(`Hello ${req.user.name}`);
      }
    );
  }
}

export default AdminsRoute;
