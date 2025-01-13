import { Entity, ManyToOne } from 'typeorm';
import { ReferenceIdInterface } from '@concepta/nestjs-common';
import { RoleInterface } from '@concepta/nestjs-common';
import { RoleAssignmentPostgresEntity } from '@concepta/nestjs-role';
import { RoleEntity } from '../../entities/role.entity';
import { UserEntity } from '../user/user.entity';

@Entity('user_role')
export class UserRoleEntity extends RoleAssignmentPostgresEntity {
  @ManyToOne(() => RoleEntity, (role) => role.assignees, { nullable: false })
  role!: RoleInterface;

  @ManyToOne(() => UserEntity, (user) => user.userRoles, { nullable: false })
  assignee!: ReferenceIdInterface;
}
