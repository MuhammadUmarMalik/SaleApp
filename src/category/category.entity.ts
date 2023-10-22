import { Product } from 'src/products/product.entity';
import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column, PrimaryGeneratedColumn,OneToMany} from 'typeorm';

@Entity()
export class Category{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    categoryCode:string;

    @Column()
    category:string;

   

    @OneToMany(()=>Product,(product)=>product.id)
    product:Product[];


    @AfterInsert()
    Insertlog(){
        console.log('Category is generated with id',this.id)
    }
    @AfterUpdate()
    logUpdate(){
        console.log('Category is updated with id',this.id)
    }
    @AfterRemove()
    logRemove(){
        console.log('Category is removed with id',this.id)
    }
}