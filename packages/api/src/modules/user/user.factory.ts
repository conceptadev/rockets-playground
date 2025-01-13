import { faker } from '@faker-js/faker';
import { UserFactory as _UserFactory } from '@concepta/nestjs-user/dist/user.factory';
import { PasswordStorageService } from '@concepta/nestjs-password';
import { UserEntity } from './user.entity';

export class UserFactory extends _UserFactory {
  passwordStorageService = new PasswordStorageService();

  protected options = {
    entity: UserEntity,
    override: _UserFactory,
  };

  protected async entity(user: UserEntity): Promise<UserEntity> {
    const email = faker.internet.email();

    user.username = email;
    user.email = email;

    const { passwordHash, passwordSalt } =
      await this.passwordStorageService.hashObject({ password: 'Test1234' });

    user.passwordHash = passwordHash;
    user.passwordSalt = passwordSalt;

    return user;
  }
}
