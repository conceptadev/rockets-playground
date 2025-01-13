import { UserInterface } from '@concepta/nestjs-common';
import { UserRoleInterface } from '../../user-role/interfaces/user-role.interface';
import { UserProfileInterface } from '../../user-profile/interfaces/user-profile.interface';

export interface UserLocalInterface extends UserInterface {
  userRoles?: UserRoleInterface[];
  userProfile?: UserProfileInterface;
}
