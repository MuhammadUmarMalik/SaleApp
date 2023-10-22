import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column, PrimaryGeneratedColumn,ManyToOne} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
@Entity()
export class Order{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product_name:string;

    @Column()
    destination:string;

    @Column()
    order_date:Date

    @Column()
    items:string;

    @Column()
    phone_number:string;

    @ManyToOne(() => User, (user) => user.id)
    order: Order;

    @ManyToOne(()=>Product,(product)=>product.id)
    product:Product;
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