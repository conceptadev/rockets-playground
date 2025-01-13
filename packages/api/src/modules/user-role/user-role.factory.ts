import { Factory } from '@concepta/typeorm-seeding';
import { UserRoleEntity } from './user-role.entity';

export class UserRoleFactory extends Factory<UserRoleEntity> {
  protected async entity(): Promise<UserRoleEntity> {
    const userRole = new UserRoleEntity();

    return userRole;
  }
}
