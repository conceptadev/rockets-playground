import {
  RuntimeException,
  RuntimeExceptionOptions,
} from '@concepta/nestjs-exception';

export class UserProfileException extends RuntimeException {
  constructor(options: RuntimeExceptionOptions) {
    super(options);

    this.errorCode = 'USER_PROFILE_ERROR';
  }
}
