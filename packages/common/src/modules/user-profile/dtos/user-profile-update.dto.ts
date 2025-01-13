import { PickType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserProfileDto } from './user-profile.dto';
import { UserProfileUpdatableInterface } from '../interfaces/user-profile-updatable.interface';

@Exclude()
export class UserProfileUpdateDto
  extends PartialType(PickType(UserProfileDto, ['fullName'] as const))
  implements UserProfileUpdatableInterface {}
