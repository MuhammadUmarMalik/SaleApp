import { IsCurrency, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  categoryId: number;
  @IsNumber()
  price: number;
  @IsNumber()
  retail: number;
  @IsNumber()
  quantity: number;
}
