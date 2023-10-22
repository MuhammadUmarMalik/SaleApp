import { Order } from 'src/orders/order.entity';
import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm';

@Entity()
export class Product{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productName:string;

    @Column()
    category:string;

    @Column()
    price:number;

    @Column()
    retail:number;

    @Column()
    quantity:number;

    @OneToMany(()=>Order,(order)=>order.id)
    order:Order[];


    @AfterInsert()
    Insertlog(){
        console.log('Order is placed with id',this.id)
    }
    @AfterUpdate()
    logUpdate(){
        console.log('Order is updated with id',this.id)
    }
    @AfterRemove()
    logRemove(){
        console.log('Order is canceled with id',this.id)
    }
}