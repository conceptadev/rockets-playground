import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CrudResponsePaginatedDto } from '@concepta/nestjs-crud';
import { StoreInterface } from '../interfaces/store.interface';
import { StoreDto } from './store.dto';

/**
 * Store paginated DTO
 */
@Exclude()
export class StorePaginatedDto extends CrudResponsePaginatedDto<StoreInterface> {
  @Expose()
  @ApiProperty({
    type: StoreDto,
    isArray: true,
    description: 'Array of Stores',
  })
  @Type(() => StoreDto)
  data: StoreInterface[] = [];
}
