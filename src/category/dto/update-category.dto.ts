import { IsEmail, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsEmail()
  @IsOptional()
  name: string;
}
