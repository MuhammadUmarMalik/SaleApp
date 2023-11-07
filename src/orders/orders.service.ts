// import { ProductsService } from './../products/products.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { error } from 'console';
import { Observable, from, interval, throwError } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class OrdersService {
  ProductsService: any;
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async create(
    product_name: string,
    destination: string,
    items: number,
    phone_number: number,
    delivery_status: string,
  ) {
    const products = await this.repo.findBy({ product_name });

    if (!products) {
      throw error('Product is not found');
    }

    const order = this.repo.create({
      product_name,
      destination,
      items,
      phone_number,
      delivery_status,
    });

    // const order_status=order.status;
    return this.repo.save(order);
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  find(product_name: string) {
    return this.repo.find({ where: { product_name } });
  }
  findAll(take: number = 10, skip: number = 0): Observable<Order[]> {
    return from(
      this.repo.findAndCount({ take, skip }).then(([orders]) => {
        return <Order[]>orders;
      }),
    );
  }

  @Cron(new Date(Date.now() + 10 + '1 * * * *'))
  async updatedelivery(id: number, attrs: Partial<Order>) {
    const order = await this.findOne(id);
    if (!order) {
      throw error('order is not found');
    } else {
      if (order.delivery_status == 'pending') {
        order.delivery_status = 'completed';
      }
    }
    Object.assign(order, attrs);
    this.repo.save(order);
    return 'your order status is updated';
  }
  async update(id: number, attrs: Partial<Order>) {
    const order = await this.findOne(id);
    if (!order) {
      throw error('order is not found');
    }
    Object.assign(order, attrs);
    this.repo.save(order);
    return 'your order is updated';
  }
  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) {
      throw error('order is not found');
    }
    this.repo.remove(order);
    return 'your order is deleted';
  }
}
