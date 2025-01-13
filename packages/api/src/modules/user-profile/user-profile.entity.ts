import { CommonPostgresEntity } from '@concepta/typeorm-common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  UserLocalInterface,
  UserProfileInterface,
} from 'rockets-playground-common';
import { UserEntity } from '../user/user.entity';

@Entity('user_profile')
export class UserProfileEntity
  extends CommonPostgresEntity
  implements UserProfileInterface
{
  @Column()
  fullName: string;

  @Column({ nullable: false })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.userProfile, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserLocalInterface;
}
