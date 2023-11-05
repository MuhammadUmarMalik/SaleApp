import { Category } from 'src/category/category.entity';
import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { error } from 'console';
import { Observable, from, throwError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(
    name: string,
    categoryId: string,
    price: number,
    retail: number,
    quantity: number,
  ) {
    const product = this.repo.create({
      name,
      categoryId,
      price,
      retail,
      quantity,
    });
    return await this.repo.save(product);
  }
  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }
  async findAll(
    take: number = 10,
    skip: number = 0,
  ): Promise<Observable<Product[]>> {
    return from(
      this.repo.findAndCount({ take, skip }).then(([products]) => {
        return <Product[]>products;
      }),
    );
  }

  async update(id: number, attrs: Partial<Product>) {
    const product = await this.findOne(id);
    if (!product) {
      throw error('user is not found');
    }
    Object.assign(product, attrs);
    await this.repo.save(product);
    return 'your product is updated.';
  }
  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw error('Product is not found');
    }

    await this.repo.remove(product);
    return 'your product is deleted';
  }
}
