import { UserDto } from '@concepta/nestjs-user';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserLocalInterface } from '../interfaces/user-local.interface';
import { UserRoleDto } from '../../user-role/dtos/user-role.dto';
import { UserRoleInterface } from '../../user-role/interfaces/user-role.interface';
import { UserProfileDto } from '../../user-profile/dtos/user-profile.dto';
import { UserProfileInterface } from '../../user-profile/interfaces/user-profile.interface';

@Exclude()
export class UserLocalDto extends UserDto implements UserLocalInterface {
  @ApiPropertyOptional({
    type: () => [UserRoleDto],
    isArray: true,
    title: 'User Roles',
  })
  @Type(() => UserRoleDto)
  @Expose()
  @IsOptional()
  userRoles?: UserRoleInterface[];

  @ApiPropertyOptional({
    type: () => UserProfileDto,
    title: 'User Profile',
  })
  @Type(() => UserProfileDto)
  @Expose()
  @IsOptional()
  userProfile?: UserProfileInterface;
}
