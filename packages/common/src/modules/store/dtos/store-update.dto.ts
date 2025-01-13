import { PickType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StoreDto } from './store.dto';
import { StoreUpdatableInterface } from '../interfaces/store-updatable.interface';

@Exclude()
export class StoreUpdateDto
  extends PartialType(
    PickType(StoreDto, [
      'name',
      'address',
      'email',
      'phoneNumber',
      'description',
      'city',
      'state',
      'zipCode',
      'openingTime',
      'closingTime',
      'active',
    ] as const),
  )
  implements StoreUpdatableInterface {}
