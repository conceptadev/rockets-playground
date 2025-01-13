import { ReferenceId } from '@concepta/nestjs-common';
import { UserProfileInterface } from './user-profile.interface';
import { UserLocalCreatableInterface } from '../../user/interfaces/user-local-creatable.interface';

export interface UserProfileCreatableInterface
  extends Pick<UserProfileInterface, 'fullName'>,
    UserLocalCreatableInterface {
  roleId: ReferenceId;
}
