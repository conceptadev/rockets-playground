import {
  AuditInterface,
  ReferenceIdInterface,
  ReferenceId,
} from "@concepta/ts-core";
import {
  UserInterface,
  RoleAssignmentInterface,
  RoleInterface,
} from "@concepta/ts-common";

export interface UserRoleInterface extends RoleAssignmentInterface {
  role: RoleInterface;
}

export interface UserLocalOwnableInterface {
  userId: ReferenceId;
  user?: UserLocalInterface;
}

interface UserLocalInterface extends UserInterface {
  userRoles?: UserRoleInterface[];
  userProfile?: UserProfileInterface;
}

enum UserProfileActivityStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface UserProfileInterface
  extends ReferenceIdInterface<ReferenceId>,
    AuditInterface,
    UserLocalOwnableInterface {
  fullName: string;
  emailVerified: boolean;
  activityStatus: UserProfileActivityStatus;
}
