import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { error } from 'console';
import { Observable, from, throwError } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(name: string) {
    const Category = await this.repo.create({ name });
    console.log(Category);
    return this.repo.save(Category);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  findAll(take: number = 10, skip: number = 0): Observable<Category[]> {
    return from(
      this.repo.findAndCount({ take, skip }).then(([orders]) => {
        return <Category[]>orders;
      }),
    );
  }
  async update(id: number, attrs: Partial<Category>) {
    const Category = await this.findOne(id);
    if (!Category) {
      throw error('user is not found');
    }
    Object.assign(Category, attrs);
    return this.repo.save(Category);
  }
  async remove(id: number) {
    const Category = await this.findOne(id);
    if (!Category) {
      throw error('user is not found');
    }
    return this.repo.remove(Category);
  }
}
