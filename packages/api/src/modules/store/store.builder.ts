import { ConfigurableCrudBuilder, CrudSoftDelete } from '@concepta/nestjs-crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  StoreInterface,
  StoreCreatableInterface,
  StoreUpdatableInterface,
  StoreDto,
  StorePaginatedDto,
  StoreCreateDto,
  StoreUpdateDto,
} from 'rockets-playground-common';
import { STORE_ENTITY_KEY } from './store.constants';
import { StoreResource } from './store.types';

export const STORE_CRUD_SERVICE_TOKEN = Symbol('__STORE_CRUD_SERVICE_TOKEN__');

const crudBuilder = new ConfigurableCrudBuilder<
  StoreInterface,
  StoreCreatableInterface,
  StoreUpdatableInterface
>();

export const {
  ConfigurableControllerClass,
  ConfigurableServiceClass: StoreCrudService,
} = crudBuilder.build({
  service: {
    entityKey: STORE_ENTITY_KEY,
    injectionToken: STORE_CRUD_SERVICE_TOKEN,
  },
  controller: {
    path: StoreResource.One,
    model: {
      type: StoreDto,
      paginatedType: StorePaginatedDto,
    },
    extraDecorators: [ApiTags(StoreResource.One), ApiBearerAuth()],
  },
  getMany: {},
  getOne: {},
  createMany: {},
  createOne: {
    dto: StoreCreateDto,
  },
  updateOne: {
    dto: StoreUpdateDto,
  },
  deleteOne: {
    extraDecorators: [CrudSoftDelete(true)],
  },
});

export class StoreController extends ConfigurableControllerClass {}
