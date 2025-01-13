import { Exclude } from 'class-transformer';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserPasswordDto } from '@concepta/nestjs-user';
import { UserLocalDto } from './user-local.dto';
import { UserLocalCreatableInterface } from '../interfaces/user-local-creatable.interface';

@Exclude()
export class UserLocalCreateDto
  extends IntersectionType(
    PickType(UserLocalDto, ['email'] as const),
    UserPasswordDto,
  )
  implements UserLocalCreatableInterface {}
