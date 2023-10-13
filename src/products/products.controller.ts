
import { Body,Controller, Post,Get,Patch,Delete,Param,Query,NotFoundException,UseGuards,UseInterceptors,ClassSerializerInterceptor} from '@nestjs/common';
;
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuards } from 'src/guards/auth.guard';
@Controller('product')
@UseGuards(AuthGuards)
export class ProductsController {

    constructor(private productsService:ProductsService){}
    
    @Post('/newproduct')
    async createProduct(@Body() body:CreateProductDto){
      
        const product = await this.productsService.create(body.productName,body.category,body.price,body.retail,body.quantity)
        return product
    }
    @Get('/:id')
    
   async findProduct(@Param('id') id:string)
    {
        const product=await this.productsService.findOne(parseInt(id));
        if(!product)
        {
            throw new NotFoundException('product is not found');
        }
        return product;
    }
    @Get('/showall')
   async findAllProduct()
    {
        const product=await this.productsService.find();
        return product;
    }

    @Delete('/:id')
    async removeProduct(@Param('id') id:string)
    {
       const product =await this.productsService.remove(parseInt(id));
       return product;
    }

    @Patch('/:id')
    async updateProduct(@Param('id') id:string, @Body() body:UpdateProductDto)
    {
       const product=await this.productsService.update(parseInt(id),body);
       return product;

    }
}
