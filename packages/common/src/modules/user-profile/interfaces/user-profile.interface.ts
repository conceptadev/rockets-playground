import {
  AuditInterface,
  ReferenceIdInterface,
  ReferenceId,
} from '@concepta/nestjs-common';
import { UserLocalOwnableInterface } from '../../user/interfaces/user-local-ownable.interface';

export interface UserProfileInterface
  extends ReferenceIdInterface<ReferenceId>,
    AuditInterface,
    UserLocalOwnableInterface {
  fullName: string;
}
