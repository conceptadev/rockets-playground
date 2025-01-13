import { ProductInterface } from './product.interface';

export interface ProductUpdatableInterface
  extends Partial<
    Pick<
      ProductInterface,
      'name' | 'price' | 'stock' | 'active' | 'imageUrl' | 'description'
    >
  > {}
