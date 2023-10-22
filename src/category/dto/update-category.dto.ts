import { IsCurrency, IsEmail,IsString, IsNumber,IsOptional} from "class-validator";

export class UpdateCategoryDto{
    @IsString()
    @IsOptional()
    productCode:string
    @IsEmail()
    @IsOptional()
    category:string
   
}