import { Entity, OneToMany } from 'typeorm';
import { RolePostgresEntity } from '@concepta/nestjs-role';
import { UserRoleEntity } from '../modules/user-role/user-role.entity';

@Entity('role')
export class RoleEntity extends RolePostgresEntity {
  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles?: UserRoleEntity[];
}
