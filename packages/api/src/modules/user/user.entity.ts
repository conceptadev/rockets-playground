import { Entity, OneToMany, OneToOne } from 'typeorm';
import { UserPostgresEntity } from '@concepta/nestjs-user';
import { UserLocalInterface } from 'rockets-playground-common';
import { UserOtpEntity } from '../../entities/user-otp.entity';
import { UserProfileEntity } from '../user-profile/user-profile.entity';
import { UserRoleEntity } from '../user-role/user-role.entity';

@Entity('user')
export class UserEntity
  extends UserPostgresEntity
  implements UserLocalInterface
{
  @OneToMany(() => UserRoleEntity, (userRole) => userRole.assignee)
  userRoles!: UserRoleEntity[];

  @OneToMany(() => UserOtpEntity, (userOtp) => userOtp.assignee)
  userOtps?: UserOtpEntity[];

  @OneToOne(() => UserProfileEntity, (userProfile) => userProfile.user)
  userProfile!: UserProfileEntity;
}
