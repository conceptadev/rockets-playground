import { ReferenceId } from '@concepta/nestjs-common';
import { UserLocalInterface } from './user-local.interface';

export interface UserLocalOwnableInterface {
  userId: ReferenceId;
  user?: UserLocalInterface;
}
