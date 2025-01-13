import {
  RuntimeException,
  RuntimeExceptionOptions,
} from '@concepta/nestjs-exception';

export class StoreException extends RuntimeException {
  constructor(options: RuntimeExceptionOptions) {
    super(options);

    this.errorCode = 'STORE_ERROR';
  }
}
