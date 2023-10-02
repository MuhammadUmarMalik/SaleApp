import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { Product } from './orders copy/product.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username:'root',
    password:'Malik@786',
    database: 'stock_system',
    entities: [User,Order,Product],
    synchronize: true,
  }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
