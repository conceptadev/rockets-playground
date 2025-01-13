import { Module } from '@nestjs/common';
import { TypeOrmExtModule } from '@concepta/nestjs-typeorm-ext';
import { StoreEntity } from './store.entity';
import {
  STORE_CRUD_SERVICE_TOKEN,
  StoreController,
  StoreCrudService,
} from './store.builder';
import { STORE_ENTITY_KEY } from './store.constants';

@Module({
  imports: [
    TypeOrmExtModule.forFeature({
      [STORE_ENTITY_KEY]: { entity: StoreEntity },
    }),
  ],
  controllers: [StoreController],
  providers: [
    {
      provide: STORE_CRUD_SERVICE_TOKEN,
      useClass: StoreCrudService,
    },
  ],
})
export class StoreModule {}
