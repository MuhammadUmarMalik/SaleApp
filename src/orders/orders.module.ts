import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { ProductsService } from 'src/products/products.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ScheduleModule.forRoot()],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
