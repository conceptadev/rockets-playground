import { ReferenceId } from '@concepta/nestjs-common';
import { UserProfileInterface } from './user-profile.interface';

export interface UserProfileOwnableInterface {
  userProfileId: ReferenceId;
  userProfile?: UserProfileInterface;
}
