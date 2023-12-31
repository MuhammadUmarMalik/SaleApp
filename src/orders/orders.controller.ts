import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Observable } from 'rxjs';
@Controller('order')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/new-order')
  createUser(@Body() body: CreateOrderDto) {
    const order = this.ordersService.create(
      body.product_name,
      body.destination,
      body.items,
      body.phone_number,
      body.delivery_status,
    );
    return order;
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.ordersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }
  @Get()
  findAllUser(@Query('product_name') product_name: string) {
    this.ordersService.find(product_name);
  }
  @Get()
  findAll(
    @Query('take') take: number = 10,
    @Query('skip') skip: number = 0,
  ): Observable<Order[]> {
    take = take > 20 ? 20 : take;
    return this.ordersService.findAll(take, skip);
  }
  @Patch('/:id')
  async updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    const order = await this.ordersService.update(parseInt(id), body);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    this.ordersService.remove(parseInt(id));
  }
}
