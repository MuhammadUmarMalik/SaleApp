import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

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