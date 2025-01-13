import {
  AuditInterface,
  ReferenceIdInterface,
  ReferenceId,
} from '@concepta/nestjs-common';
import { ProductInterface } from '../../product/interfaces/product.interface';

export interface StoreInterface
  extends ReferenceIdInterface<ReferenceId>,
    AuditInterface {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  description?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  openingTime?: string;
  closingTime?: string;
  active?: boolean;
  products?: ProductInterface[];
}
