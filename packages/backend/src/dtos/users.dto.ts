import { UserRole } from "@/interfaces/users.interface";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email address is required" })
  public email: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  public password: string;

  @IsOptional()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(UserRole)
  public role: UserRole;
}
