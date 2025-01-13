import {
  RoleAssignmentInterface,
  RoleInterface,
} from '@concepta/nestjs-common';

export interface UserRoleInterface extends RoleAssignmentInterface {
  role: RoleInterface;
}
