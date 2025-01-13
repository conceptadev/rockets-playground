import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { StoreEntity } from './store.entity';
import { StoreException } from './store.exception';

@EventSubscriber()
export class StoreSubscriber implements EntitySubscriberInterface<StoreEntity> {
  listenTo() {
    return StoreEntity;
  }

  async beforeInsert(event: InsertEvent<StoreEntity>): Promise<void> {
    await this.checkUniqueness(event);
  }

  async beforeUpdate(event: UpdateEvent<StoreEntity>): Promise<void> {
    await this.checkUniqueness(event);
  }

  private async checkUniqueness(
    event: InsertEvent<StoreEntity> | UpdateEvent<StoreEntity>,
  ): Promise<void> {
    const entity = event.entity;

    if (!entity?.name || !entity?.address) return;

    const existingStore = await event.manager.findOne(StoreEntity, {
      where: {
        name: entity.name,
        address: entity.address,
      },
    });

    if (existingStore && existingStore.id !== entity.id) {
      throw new StoreException({
        httpStatus: HttpStatus.BAD_REQUEST,
        message: 'A Store with the same name and address already exists.',
      });
    }
  }
}
