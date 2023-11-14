import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../../user/entities/user.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsEnum(RoleEnum)
  role: RoleEnum;

 
}

