import { Module } from '@nestjs/common';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { ProductCrudService } from './product-crud.service';
import { PRODUCT_ENTITY_KEY } from './product.constant';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';

@Module({
  imports: [
    TypeOrmExtModule.forFeature({
      [PRODUCT_ENTITY_KEY]: { entity: ProductEntity },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductCrudService],
})
export class ProductModule {}
