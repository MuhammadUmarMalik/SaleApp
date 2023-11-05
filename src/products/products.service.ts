import { Category } from 'src/category/category.entity';
// import { Category } from './../category/category.entity';
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
    const product = await this.repo.create({
      name,
      categoryId,
      price,
      retail,
      quantity,
    });
    console.log(this.repo);
    return this.repo.save(product);
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  findAll(take: number = 10, skip: number = 0): Observable<Product[]> {
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
    return this.repo.save(product);
  }
  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw error('user is not found');
    }
    return this.repo.remove(product);
  }
}
