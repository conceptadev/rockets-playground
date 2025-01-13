import { ReferenceId } from '@concepta/nestjs-common';
import { StoreInterface } from './store.interface';

export interface StoreOwnableInterface {
  storeId: ReferenceId;
  store?: StoreInterface;
}
