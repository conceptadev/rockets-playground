import { ApiProperty } from '@nestjs/swagger';
import { CommonEntityDto } from '@concepta/nestjs-common';
import { RoleDto } from '@concepta/nestjs-role';
import { UserDto } from '@concepta/nestjs-user';
import { RoleInterface, UserInterface } from '@concepta/nestjs-common';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserRoleInterface } from '../interfaces/user-role.interface';

@Exclude()
export class UserRoleDto extends CommonEntityDto implements UserRoleInterface {
  @ApiProperty({
    type: () => RoleDto,
    title: 'Role Entity',
  })
  @Type(() => RoleDto)
  @ValidateNested()
  @Expose()
  role: RoleInterface;

  @ApiProperty({
    type: () => UserDto,
    title: 'User Associated',
  })
  @Type(() => UserDto)
  @Expose()
  @ValidateNested()
  assignee: UserInterface;
}
