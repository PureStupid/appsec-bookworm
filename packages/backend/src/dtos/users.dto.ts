import { UserRole } from "@/interfaces/users.interface";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(UserRole)
  public role: UserRole;
}
