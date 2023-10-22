
// import { Order } from './../orders/order.entity';

import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Order } from 'src/orders/order.entity';
@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    address:string;

    @Column()
    email:string

    @Column()
    @Exclude()
    password:string;

    @Column()
    phone_number:string;

    @OneToMany(() => Order, (order) => order.id)
    orders: Order[];

    @AfterInsert()
    Insertlog(){
        console.log('Inserted User with id',this.id)
    }
    @AfterUpdate()
    logUpdate(){
        console.log('Inserted User with id',this.id)
    }
    @AfterRemove()
    logRemove(){
        console.log('Inserted User with id',this.id)
    }
}