import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { OtpPostgresEntity } from '@concepta/nestjs-otp';

import { UserEntity } from '../modules/user/user.entity';

@Entity('user_otp')
export class UserOtpEntity extends OtpPostgresEntity {
  @ManyToOne(() => UserEntity, (user) => user.userOtps, { nullable: false })
  assignee!: ReferenceIdInterface;
}
