import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { RECAPTCHA_SECRET_KEY, SECRET_KEY } from "@config";
import { CreateUserDto, UserDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import {
  DataStoredInToken,
  TokenData,
} from "@shared/interfaces/auth.interface";
import { PartialUser, User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";
import axios from "axios";

class AuthService {
  public users = userModel;

  public async signup(
    userData: CreateUserDto
  ): Promise<{ createUserData: PartialUser; token: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const partialUser: PartialUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.createToken(createUserData);

    return { createUserData: partialUser, token: token };
  }

  public async login(
    userData: UserDto
  ): Promise<{ findUser: PartialUser; token: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser = await this.users.findOne({
      email: userData.email,
    });

    if (!findUser) throw new HttpException(409, `Invalid email or password.`);
    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );

    const partialUser: PartialUser = {
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    };

    if (!isPasswordMatching)
      throw new HttpException(409, "Invalid email or password");

    const token = this.createToken(findUser);

    return { findUser: partialUser, token: token };
  }

  public createToken(user: PartialUser): TokenData {
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }),
    };
  }

  public async validateRecaptcha(token: string) {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    if (res.status === 200 && res.data.success) {
      return { message: "reCAPTCHA success" };
    } else {
      throw new HttpException(400, "reCAPTCHA failed");
    }
  }
}

export default AuthService;
