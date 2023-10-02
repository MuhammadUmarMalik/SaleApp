import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { Order } from './order.entity';
import { error } from 'console';
import { throwError } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private repo:Repository<Order>){}

    create(product_name:string,destination:string,items:string){
        const order=this.repo.create({product_name,destination,items})

        return this.repo.save(order)
    }
    findOne( id : number ){
        return this.repo.findOneBy({id});
    }
    find(product_name:string){
        return this.repo.find({where:{product_name}})
    }
    async update(id:number, attrs:Partial<Order>)
    {
        const user=await this.findOne(id);
        if(!user)
        {
            throw error('user is not found')
        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }
    async remove(id:number )
    {
        const user = await this.findOne(id)
        if(!user)
        {
            throw error('user is not found');
        }
        return this.repo.remove(user);
    }
}
