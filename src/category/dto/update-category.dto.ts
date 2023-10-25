import { IsCurrency, IsEmail,IsString, IsNumber,IsOptional} from "class-validator";

export class UpdateCategoryDto{
    @IsString()
    @IsOptional()
    categoryCode:string
    @IsEmail()
    @IsOptional()
    category:string
   
}