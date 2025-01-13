import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '@concepta/nestjs-exception';

export class ProductNotFoundException extends RuntimeException {
  constructor(message = 'The product was not found.', originalError?: unknown) {
    super({
      message,
      originalError,
      httpStatus: HttpStatus.NOT_FOUND,
    });

    this.errorCode = 'PRODUCT_NOT_FOUND_ERROR';
  }
}
