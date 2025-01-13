import { PickType, IntersectionType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StoreDto } from './store.dto';
import { StoreCreatableInterface } from '../interfaces/store-creatable.interface';

@Exclude()
export class StoreCreateDto
  extends IntersectionType(
    PickType(StoreDto, ['name', 'address', 'email', 'phoneNumber'] as const),
    PartialType(
      PickType(StoreDto, [
        'description',
        'city',
        'state',
        'zipCode',
        'openingTime',
        'closingTime',
        'active',
      ]),
    ),
  )
  implements StoreCreatableInterface {}
