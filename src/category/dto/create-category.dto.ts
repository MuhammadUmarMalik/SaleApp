import { IsString} from "class-validator";

export class CreateCategoryDto{
    @IsString()
    productCode:string
    @IsString()
    category:string
   
}