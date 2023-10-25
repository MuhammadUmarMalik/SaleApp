import { IsString} from "class-validator";

export class CreateCategoryDto{
    @IsString()
    categoryCode:string
    @IsString()
    category:string
   
}