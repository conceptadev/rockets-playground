import {
  CanAccess,
  AccessControlContext,
  ActionEnum,
} from '@concepta/nestjs-access-control';
import { Injectable } from '@nestjs/common';
import { RoleLookupService, RoleService } from '@concepta/nestjs-role';
import { plainToInstance } from 'class-transformer';
import { UserLocalDto, UserProfileDto } from 'rockets-playground-common';
import { UserProfileResource } from './user-profile.types';
import { UserProfileException } from './user-profile.exception';
import { AppRole } from '../../app.acl';
import { USER_ROLE_ASSIGNMENT_KEY } from '../user-role/user-role.constants';

@Injectable()
export class UserProfileAccessQueryService implements CanAccess {
  constructor(
    private readonly roleLookupService: RoleLookupService,
    private roleService: RoleService,
  ) {}

  private get actionResourceHandlers() {
    return {
      [UserProfileResource.One]: {
        [ActionEnum.READ]: (context: AccessControlContext) =>
          this.canRead(context),
        [ActionEnum.UPDATE]: (context: AccessControlContext) =>
          this.canUpdate(context),
      },
    };
  }

  async canAccess(context: AccessControlContext): Promise<boolean> {
    const { resource, action } = context.getQuery();

    const handler = this.actionResourceHandlers[resource]?.[action];

    if (!handler) {
      return true;
    }

    return handler(context);
  }

  private async canRead(context: AccessControlContext): Promise<boolean> {
    const userAuthorizedDto = plainToInstance(UserLocalDto, context.getUser());

    const params = context.getRequest('params');

    const userProfileParamDto = plainToInstance(UserProfileDto, params);

    if (userAuthorizedDto.userProfile.id === userProfileParamDto.id) {
      return true;
    }

    const role = await this.roleLookupService.findOne({
      where: { name: AppRole.SuperAdmin },
    });

    if (!role) {
      throw new UserProfileException({
        message: 'Error while trying to lookup a Role reference',
      });
    }

    const adminCanAccess = await this.roleService.isAssignedRole(
      USER_ROLE_ASSIGNMENT_KEY,
      role,
      userAuthorizedDto,
    );

    return adminCanAccess;
  }

  private async canUpdate(context: AccessControlContext): Promise<boolean> {
    const userAuthorizedDto = plainToInstance(UserLocalDto, context.getUser());

    const params = context.getRequest('params');

    const userProfileParamDto = plainToInstance(UserProfileDto, params);

    if (userAuthorizedDto.userProfile.id === userProfileParamDto.id) {
      return true;
    }

    return false;
  }
}
