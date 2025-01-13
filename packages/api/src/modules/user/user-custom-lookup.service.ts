import { UserEntityInterface, UserLookupService } from '@concepta/nestjs-user';
import { ReferenceSubject } from '@concepta/nestjs-common';
import { QueryOptionsInterface } from '@concepta/typeorm-common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserCustomException } from './user-custom.exception';

@Injectable()
export class UserCustomLookupService extends UserLookupService {
  async bySubject(
    subject: ReferenceSubject,
    queryOptions?: QueryOptionsInterface,
  ): Promise<UserEntityInterface | null> {
    const user = await this.findOne(
      {
        where: { id: subject },
        relations: ['userRoles', 'userRoles.role', 'userProfile'],
      },
      queryOptions,
    );

    if (!user) {
      throw new UserCustomException({
        message: 'User not found',
        httpStatus: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }
}
