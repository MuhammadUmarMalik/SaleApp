
import { Body,Controller, Post,Get,Patch,Delete,Param,Query,NotFoundException,UseInterceptors,ClassSerializerInterceptor} from '@nestjs/common';
;
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
@Controller('order')
export class OrdersController {

    constructor(private ordersService:OrdersService){}
    
    @Post('/neworder')
    createUser(@Body() body:CreateOrderDto){
      
        this.ordersService.create(body.product_name,body.destination,body.order_date,body.items,body.phone_number)
    }
    @Get('/:id')
    
   async findUser(@Param('id') id:string)
    {
        const user=await this.ordersService.findOne(parseInt(id));
        if(!user)
        {
            throw new NotFoundException('User is not found')
        }
        return user
    }
    @Get()
    findAllUser(@Query('product_name') product_name:string)
    {
        this.ordersService.find(product_name)

    }
    @Get('/getallorder')
    findAllUsers()
    {
        this.ordersService.findall()
    }
    @Delete('/:id')
    removeUser(@Param('id') id:string)
    {
        this.ordersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateOrderDto)
    {
        this.ordersService.update(parseInt(id),body)
    }
}
