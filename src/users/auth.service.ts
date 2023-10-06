import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(
    name: string,
    address: string,
    email: string,
    password: string,
    phone_number: string,
  ) {
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('Email is in use');
    }
    //hash and user password
    //create salt
    const salt = randomBytes(8).toString('hex');

    // hash and salt the password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user and store it into db
    const user= await this.userService.create(name,address,email,result,phone_number);
    //return the user
    return user;
  }
}
