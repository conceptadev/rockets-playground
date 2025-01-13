import {
  AuditInterface,
  ReferenceIdInterface,
  ReferenceId,
} from '@concepta/nestjs-common';
import { StoreOwnableInterface } from '../../store/interfaces/store-ownable.interface';

export interface ProductInterface
  extends ReferenceIdInterface<ReferenceId>,
    AuditInterface,
    StoreOwnableInterface {
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  active?: boolean;
}
