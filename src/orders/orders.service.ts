import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { error } from 'console';
import { Observable, from, throwError } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async create(
    product_name: string,
    destination: string,
    order_date: Date,
    items: number,
    phone_number: number,
  ) {
    const product = await this.repo.findOneByOrFail({ product_name });

    if (!product) {
      throw error('Product is not found');
    }

    const order = this.repo.create({
      product_name,
      destination,
      order_date,
      items,
      phone_number,
    });

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
