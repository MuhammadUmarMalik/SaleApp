import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { Product } from './product.entity';
import { error } from 'console';
import { throwError } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo:Repository<Product>){}

   async create(productName:string,category:string,price:number,retail:number,quantity:number){
        const product=await this.repo.create({productName,category,price,retail,quantity})
        console.log(this.repo)
        return this.repo.save(product)
    }
    findOne( id : number ){
        return this.repo.findOneBy({id});
    }
    find(){
        const product=this.repo.find();
        return product;
    }
    async update(id:number, attrs:Partial<Product>)
    {
        const product=await this.findOne(id);
        if(!product)
        {
            throw error('user is not found')
        }
        Object.assign(product,attrs);
        return this.repo.save(product);
    }
    async remove(id:number )
    {
        const product = await this.findOne(id)
        if(!product)
        {
            throw error('user is not found');
        }
        return this.repo.remove(product);
    }
}
