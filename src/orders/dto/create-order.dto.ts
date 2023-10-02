import { IsEmail,IsString, } from "class-validator";

export class CreateOrderDto{
    @IsString()
    product_name:string
    @IsEmail()
    destination:string
    @IsString()
    order_date:Date
    @IsString()
    items:string
}