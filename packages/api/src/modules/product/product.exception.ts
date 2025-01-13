import {
  RuntimeException,
  RuntimeExceptionOptions,
} from '@concepta/nestjs-exception';

export class ProductException extends RuntimeException {
  constructor(options: RuntimeExceptionOptions) {
    super(options);

    this.errorCode = 'PRODUCT_ERROR';
  }
}
