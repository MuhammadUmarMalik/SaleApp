import { Product } from './product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';

describe('ProdcutsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
