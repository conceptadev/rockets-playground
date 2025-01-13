import { IntersectionType, PickType, ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { UserProfileDto } from './user-profile.dto';
import { UserProfileCreatableInterface } from '../interfaces/user-profile-creatable.interface';
import { UserLocalCreateDto } from '../../user/dtos/user-local-create.dto';

@Exclude()
export class UserProfileCreateDto
  extends IntersectionType(
    PickType(UserProfileDto, ['fullName', 'userId'] as const),
    UserLocalCreateDto,
  )
  implements UserProfileCreatableInterface
{
  @Expose()
  @ApiProperty({ type: 'string', format: 'uuid', description: 'Role  ID' })
  @IsUUID()
  roleId: string;
}
