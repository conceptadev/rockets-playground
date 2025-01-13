import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductException } from './product.exception';

@EventSubscriber()
export class ProductSubscriber
  implements EntitySubscriberInterface<ProductEntity>
{
  listenTo() {
    return ProductEntity;
  }

  async beforeInsert(event: InsertEvent<ProductEntity>): Promise<void> {
    await this.checkUniqueness(event);
  }

  async beforeUpdate(event: UpdateEvent<ProductEntity>): Promise<void> {
    await this.checkUniqueness(event);
  }

  private async checkUniqueness(
    event: InsertEvent<ProductEntity> | UpdateEvent<ProductEntity>,
  ): Promise<void> {
    const entity = event.entity;

    if (!entity?.name || !entity?.price || !entity?.storeId) return;

    const existingProduct = await event.manager.findOne(ProductEntity, {
      where: {
        name: entity.name,
        price: entity.price,
        storeId: entity.storeId,
      },
    });

    if (existingProduct && existingProduct.id !== entity.id) {
      throw new ProductException({
        httpStatus: HttpStatus.BAD_REQUEST,
        message:
          'A product with the same name and price already exists in this store.',
      });
    }
  }
}
