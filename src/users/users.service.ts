import { map } from 'rxjs/operators';
import { IsEmail } from 'class-validator';
import { Injectable, Options, ValidationPipe } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { error } from 'console';
import { Observable, from, throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(
    name: string,
    address: string,
    email: string,
    password: string,
    phone_number: string,
  ) {
    const user = await this.repo.create({
      name,
      address,
      email,
      password,
      phone_number,
    });
    console.log(this.repo);
    return this.repo.save(user);
  }
  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    return user;
  }
  async find(email: string) {
    const user = await this.repo.find({ where: { email } });
    return user;
  }

  findAll(take: number = 10, skip: number = 0): Observable<User[]> {
    return from(
      this.repo.findAndCount({ take, skip }).then(([users]) => {
        return <User[]>users;
      }),
    );
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw error('user is not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw error('user is not found');
    }
    return this.repo.remove(user);
  }
}
