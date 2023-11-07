import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  product_name: string;

  @IsString()
  @IsOptional()
  destination: string;

  // @IsDate()
  // @IsOptional()
  // order_date: Date;

  @IsNumber()
  @IsOptional()
  items: number;

  @IsNumber()
  @IsOptional()
  phone_number: number;

  @IsString()
  @IsOptional()
  delivery_status: string;
}
