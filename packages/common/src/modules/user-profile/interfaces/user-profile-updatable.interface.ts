import { UserProfileInterface } from './user-profile.interface';

export interface UserProfileUpdatableInterface
  extends Partial<Pick<UserProfileInterface, 'fullName'>> {}
