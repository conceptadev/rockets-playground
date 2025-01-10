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

export interface User {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
  version: number;
  email: string;
  username: string;
  active: boolean;
}
