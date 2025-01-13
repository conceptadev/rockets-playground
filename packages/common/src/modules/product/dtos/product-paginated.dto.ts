import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CrudResponsePaginatedDto } from '@concepta/nestjs-crud';
import { ProductDto } from './product.dto';
import { ProductInterface } from '../interfaces/product.interface';

/**
 * Product paginated DTO
 */
@Exclude()
export class ProductPaginatedDto extends CrudResponsePaginatedDto<ProductInterface> {
  @Expose()
  @ApiProperty({
    type: ProductDto,
    isArray: true,
    description: 'Array of Products',
  })
  @Type(() => ProductDto)
  data: ProductInterface[] = [];
}
