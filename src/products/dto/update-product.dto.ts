import { IsCurrency, IsEmail,IsString, IsNumber,IsOptional} from "class-validator";

export class UpdateProductDto{
    @IsString()
    @IsOptional()
    name:string
    @IsEmail()
    @IsOptional()
    category:string
    @IsCurrency()
    @IsOptional()
    price:number
    @IsCurrency()
    @IsOptional()
    retail_price:number
    @IsNumber()
    @IsOptional()
    quantity:number
}