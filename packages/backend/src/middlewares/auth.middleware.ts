import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/HttpException";
import {
  DataStoredInToken,
  RequestWithUser,
} from "@shared/interfaces/auth.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@/utils/util";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new HttpException(404, "Authentication token missing"));
    }
    const token = authHeader.split(" ")[1];
    const verificationResponse = verify(token, SECRET_KEY) as DataStoredInToken;
    const userId = verificationResponse._id;
    const findUser = await userModel.findById(userId);

    if (!findUser) {
      return next(new HttpException(404, "User not found"));
    }
    req.user = findUser;
    next();
  } catch (error) {
    return next(new HttpException(401, "Wrong authentication token"));
  }
};

const checkUserRole =
  (role: string) =>
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (isEmpty(req.user)) next(new HttpException(400, "userData is empty"));
    const email = (req.user as unknown as { email: string }).email;
    const findUser = await userModel.findOne({ email: email });
    const userRole = findUser?.role || "";
    !role.includes(userRole)
      ? next(
          new HttpException(
            401,
            "Sorry, you do not have access to this resource"
          )
        )
      : next();
  };

export default authMiddleware;
export { checkUserRole };
