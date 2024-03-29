import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDTO {
  id: number
  
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  role: string;

  @IsString()
  password: string;
}