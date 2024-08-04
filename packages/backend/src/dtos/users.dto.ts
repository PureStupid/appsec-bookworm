import { UserRole } from "@shared/types/user.role";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  public name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email address is required" })
  public email: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  )
  public password: string;

  @IsOptional()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(UserRole)
  public role: UserRole;
}
export class UserDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email address is required" })
  public email: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  )
  public password: string;

  @IsOptional()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(UserRole)
  public role: UserRole;
}
