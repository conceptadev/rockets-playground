import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@concepta/nestjs-crud';
import { InjectDynamicRepository } from '@concepta/nestjs-typeorm-ext';
import { ProductEntity } from './product.entity';
import { PRODUCT_ENTITY_KEY } from './product.constant';

export class ProductCrudService extends TypeOrmCrudService<ProductEntity> {
  constructor(
    @InjectDynamicRepository(PRODUCT_ENTITY_KEY)
    public repo: Repository<ProductEntity>,
  ) {
    super(repo);
  }
}
