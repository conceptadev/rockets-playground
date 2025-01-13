import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { UserProfileEntity } from '../user-profile/user-profile.entity';
import { UserFactory } from '../user/user.factory';

export class UserProfileFactory extends Factory<UserProfileEntity> {
  protected async entity(
    userProfile: UserProfileEntity = new UserProfileEntity(),
  ): Promise<UserProfileEntity> {
    userProfile.fullName = faker.person.fullName();

    const user = await this.factory(UserFactory).create();

    userProfile.user = user;

    return userProfile;
  }
}
