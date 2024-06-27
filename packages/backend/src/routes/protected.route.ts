import { Request, Response, Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware, { checkUserRole } from "@/middlewares/auth.middleware";
import { UserRole } from "@/interfaces/users.interface";

// very simple routes to demonstrate the use of the auth middleware
class ProtectedRoute implements Routes {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}student-protected`,
      authMiddleware,
      checkUserRole([UserRole.STUDENT]),
      (req: Request, res: Response) => {
        return res.send("Student Protected Route");
      }
    );
  }
}

export default ProtectedRoute;
