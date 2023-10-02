import { Prodcut } from './product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ProdcutsController } from './products.controller';

describe('ProdcutsController', () => {
  let controller: ProdcutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdcutsController],
    }).compile();

    controller = module.get<ProdcutsController>(ProdcutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
