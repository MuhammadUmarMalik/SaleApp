import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
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