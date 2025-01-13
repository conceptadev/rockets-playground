import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CrudResponsePaginatedDto } from '@concepta/nestjs-crud';
import { UserProfileInterface } from '../interfaces/user-profile.interface';
import { UserProfileDto } from './user-profile.dto';

/**
 * User Profile paginated DTO
 */
@Exclude()
export class UserProfilePaginatedDto extends CrudResponsePaginatedDto<UserProfileInterface> {
  @Expose()
  @ApiProperty({
    type: UserProfileDto,
    isArray: true,
    description: 'Array of User Profile',
  })
  @Type(() => UserProfileDto)
  data: UserProfileInterface[] = [];
}
