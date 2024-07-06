import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { CreateUserDto, UserDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";

class AuthService {
  public users = userModel;

  public async signup(
    userData: CreateUserDto
  ): Promise<{ createUserData: User; token: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.createToken(createUserData);

    return { createUserData, token };
  }

  public async login(
    userData: UserDto
  ): Promise<{ findUser: User; token: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await this.users.findOne({
      email: userData.email,
      role: userData.role,
    });
    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found with this role`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, "Password is not matching");

    const token = this.createToken(findUser);

    return { findUser, token };
  }

  public createToken(user: User): TokenData {
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
}

export default AuthService;
