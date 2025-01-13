import { UserCreatableInterface } from '@concepta/nestjs-common';

export interface UserLocalCreatableInterface
  extends Pick<UserCreatableInterface, 'email' | 'password'> {}
