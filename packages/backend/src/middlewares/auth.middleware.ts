import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, RequestWithUser } from "@interfaces/auth.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@/utils/util";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization =
      req.cookies["Authorization"] ||
      (req.header("Authorization")
        ? req.header("Authorization").split(" ")[1]
        : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(
        Authorization,
        secretKey
      ) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

const checkUserRole =
  (roles: string[]) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (isEmpty(req.body)) throw new HttpException(400, "userData is empty");
    const email = (req.body as unknown as { email: string }).email;
    const findUser = await userModel.findOne({ email: email });
    const userRole = findUser?.role || "";
    !roles.includes(userRole)
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
