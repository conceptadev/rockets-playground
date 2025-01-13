import {
  RuntimeException,
  RuntimeExceptionOptions,
} from '@concepta/nestjs-exception';

export class UserCustomException extends RuntimeException {
  constructor(options: RuntimeExceptionOptions) {
    super(options);

    this.errorCode = 'USER_CUSTOM_ERROR';
  }
}
