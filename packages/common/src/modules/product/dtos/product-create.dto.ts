import { PartialType, PickType, IntersectionType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ProductCreatableInterface } from '../interfaces/product-creatable.interface';
import { ProductDto } from './product.dto';

@Exclude()
export class ProductCreateDto
  extends IntersectionType(
    PickType(ProductDto, ['name', 'price', 'stock'] as const),
    PartialType(PickType(ProductDto, ['description', 'imageUrl', 'active'])),
  )
  implements ProductCreatableInterface {}
