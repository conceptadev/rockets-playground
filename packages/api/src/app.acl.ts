import { AccessControl } from 'accesscontrol';
import { UserResource } from '@concepta/nestjs-user';
import { RoleAssignmentResource, RoleResource } from '@concepta/nestjs-role';
import { createResources } from './common/utils/create-resources.util';
import { UserProfileResource } from './modules/user-profile/user-profile.types';
import { StoreResource } from './modules/store/store.types';
import { MeResource } from './modules/me/me.types';
import { ProductResource } from './modules/product/product.types';

export enum AppRole {
  SuperAdmin = 'SuperAdmin',
  User = 'User',
}

const allResources = createResources(
  UserResource,
  RoleAssignmentResource,
  RoleResource,
  UserProfileResource,
  StoreResource,
  ProductResource,
  MeResource,
);

const userResources = createResources(MeResource);

export const acRules: AccessControl = new AccessControl();

acRules
  .grant(AppRole.SuperAdmin)
  .resource(allResources)
  .createOwn()
  .createAny()
  .readOwn()
  .readAny()
  .updateOwn()
  .updateAny()
  .deleteOwn()
  .deleteAny();

const allRoles = Object.values(AppRole);

acRules
  .grant(AppRole.User)
  .resource(userResources)
  .readOwn()
  .resource([UserResource.One, UserProfileResource.One])
  .updateOwn()
  .resource([
    StoreResource.One,
    StoreResource.Many,
    ProductResource.One,
    ProductResource.Many,
  ])
  .readAny();

acRules
  .grant(allRoles)
  .resource([UserProfileResource.One, MeResource.One])
  .readOwn();

acRules.deny(allRoles).resource(UserResource.One).deleteOwn();
