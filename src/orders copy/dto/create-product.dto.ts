import { IsCurrency, IsEmail,IsString, IsNumber} from "class-validator";

export class CreateProductDto{
    @IsString()
    name:string
    @IsEmail()
    category:string
    @IsCurrency()
    price:number
    @IsCurrency()
    retail_price:number
    @IsNumber()
    quantity:number
}