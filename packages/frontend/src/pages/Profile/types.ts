export interface ProfileFormData {
  email: string;
  firstName: string;
  lastName: string;
}

export interface PasswordChangeFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserRole {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
  version: number;
}

export interface UserProfile {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
  version: number;
  fullName: string;
  nickname: string;
  emailVerified: boolean;
  activityStatus: string;
  userId: string;
}

export interface User {
  email: string;
  username: string;
  active: boolean;
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
  version: number;
  userRoles: UserRole[];
  userProfile: UserProfile;
}
