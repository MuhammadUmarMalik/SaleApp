import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class findUser {
  @IsString()
  @IsNotEmpty()
  id: string;
}
