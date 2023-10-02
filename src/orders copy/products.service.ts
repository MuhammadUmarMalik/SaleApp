import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { Product } from './product.entity';
import { error } from 'console';
import { throwError } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo:Repository<Product>){}

    create(name:string,category:string,price:number,retail_price:number,quantity:number){
        const product=this.repo.create({name,category,price,retail_price,quantity})

        return this.repo.save(product)
    }
    findOne( id : number ){
        return this.repo.findOneBy({id});
    }
    find(name:string){
        return this.repo.find({where:{name}})
    }
    async update(id:number, attrs:Partial<Product>)
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
