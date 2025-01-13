import { ProductInterface } from './product.interface';

export interface ProductCreatableInterface
  extends Pick<ProductInterface, 'name' | 'price' | 'stock'>,
    Partial<Pick<ProductInterface, 'active' | 'imageUrl' | 'description'>> {}
