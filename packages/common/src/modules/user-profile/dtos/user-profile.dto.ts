import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonEntityDto } from '@concepta/nestjs-common';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserProfileInterface } from '../interfaces/user-profile.interface';
import { UserLocalDto } from '../../user/dtos/user-local.dto';
import { UserLocalInterface } from '../../user/interfaces/user-local.interface';

@Exclude()
export class UserProfileDto
  extends CommonEntityDto
  implements UserProfileInterface
{
  @Expose()
  @ApiProperty({ type: 'string', description: 'Full name' })
  @IsString()
  fullName: string;

  @Expose()
  @ApiProperty({ type: 'string', description: 'User ID' })
  @IsUUID()
  userId: string;

  @Expose()
  @ApiPropertyOptional({
    type: () => UserLocalDto,
    title: 'User Local Entity',
  })
  @Type(() => UserLocalDto)
  @IsOptional()
  user?: UserLocalInterface;
}
