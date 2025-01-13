import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '@concepta/nestjs-exception';

export class StoreNotFoundException extends RuntimeException {
  constructor(message = 'Store not found.', originalError?: unknown) {
    super({
      message,
      originalError,
      httpStatus: HttpStatus.NOT_FOUND,
    });

    this.errorCode = 'STORE_NOT_FOUND_ERROR';
  }
}
