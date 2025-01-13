import {
  UserEntityInterface,
  UserMutateService,
  UserPasswordService,
} from '@concepta/nestjs-user';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDynamicRepository } from '@concepta/nestjs-typeorm-ext';
import { USER_MODULE_USER_ENTITY_KEY } from '@concepta/nestjs-user/dist/user.constants';

@Injectable()
export class UserCustomMutateService extends UserMutateService {
  constructor(
    @InjectDynamicRepository(USER_MODULE_USER_ENTITY_KEY)
    repo: Repository<UserEntityInterface>,
    protected readonly userPasswordService: UserPasswordService,
  ) {
    super(repo, userPasswordService);
  }
}
