import { IsCurrency, IsEmail,IsString, IsNumber} from "class-validator";

export class CreateProductDto{
    @IsString()
    productName:string
    @IsString()
    category:string
    @IsNumber()
    price:number
    @IsNumber()
    retail:number
    @IsNumber()
    quantity:number
}