import { PickType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ProductUpdatableInterface } from '../interfaces/product-updatable.interface';
import { ProductDto } from './product.dto';

@Exclude()
export class ProductUpdateDto
  extends PartialType(
    PickType(ProductDto, [
      'name',
      'price',
      'stock',
      'active',
      'imageUrl',
      'description',
    ] as const),
  )
  implements ProductUpdatableInterface {}
