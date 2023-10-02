
import { Body,Controller, Post,Get,Patch,Delete,Param,Query,NotFoundException,UseInterceptors,ClassSerializerInterceptor} from '@nestjs/common';
;
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Controller('product')
export class ProductsController {

    constructor(private productsService:ProductsService){}
    
    @Post('/newproduct')
    createUser(@Body() body:CreateProductDto){
      
        this.productsService.create(body.name,body.category,body.price,body.retail_price,body.quantity)
    }
    @Get('/:id')
    
   async findUser(@Param('id') id:string)
    {
        const user=await this.productsService.findOne(parseInt(id));
        if(!user)
        {
            throw new NotFoundException('User is not found')
        }
        return user
    }
    @Get()
    findAllUser(@Query('product_name') product_name:string)
    {
        this.productsService.find(product_name)

    }

    @Delete('/:id')
    removeUser(@Param('id') id:string)
    {
        this.productsService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateProductDto)
    {
        this.productsService.update(parseInt(id),body)
    }
}
