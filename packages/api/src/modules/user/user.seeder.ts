import { Seeder } from '@concepta/typeorm-seeding';
import { UserInterface, RoleInterface } from '@concepta/nestjs-common';
import { UserFactory } from './user.factory';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../../entities/role.entity';
import { AppRole } from '../../app.acl';
import { UserRoleFactory } from '../user-role/user-role.factory';

export class UserSeeder extends Seeder {
  async run() {
    const userFactory = this.factory(UserFactory);

    const superAdminUsers = await userFactory.createMany(5);
    const contributorUsers = await userFactory.createMany(10);

    const [superAdminRole, contributorRole] = await Promise.all([
      this.getRoleByName(AppRole.SuperAdmin),
      this.getRoleByName(AppRole.User),
    ]);

    for (const adminUser of superAdminUsers) {
      await this.assignUsersRole(adminUser, superAdminRole);
    }

    for (const contributorUser of contributorUsers) {
      await this.assignUsersRole(contributorUser, contributorRole);
    }
  }

  private getRoleByName(roleName: AppRole): Promise<RoleEntity> {
    return this.repository(UserEntity).manager.findOne(RoleEntity, {
      where: { name: roleName },
    });
  }

  private assignUsersRole(user: UserInterface, role: RoleInterface) {
    return this.factory(UserRoleFactory).create({
      assignee: user,
      role,
    });
  }
}
