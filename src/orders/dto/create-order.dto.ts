import { IsEmail, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  product_name: string;
  @IsString()
  destination: string;
  // @IsDate()
  // order_date: Date;
  @IsNumber()
  items: number;
  @IsNumber()
  phone_number: number;
  @IsString()
  delivery_status: string;
}
