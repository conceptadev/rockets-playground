import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserCustomException } from './user-custom.exception';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    this.transformEmailAndUsernameToLowerCase(event);
    this.setUsernameFromEmail(event);
    await this.checkUniqueness(event);
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    this.setUsernameFromEmail(event);
    this.transformEmailAndUsernameToLowerCase(event);
    await this.checkUniqueness(event);
  }

  private async checkUniqueness(
    event: InsertEvent<UserEntity> | UpdateEvent<UserEntity>,
  ): Promise<void> {
    if (!event.entity?.email) return;

    const existingUser = await event.manager.findOne(UserEntity, {
      where: { email: event.entity.email },
    });

    if (existingUser && existingUser.id !== event.entity.id) {
      throw new UserCustomException({
        httpStatus: HttpStatus.BAD_REQUEST,
        message:
          'This email is already in use. Please contact support if this is an error.',
      });
    }
  }

  private transformEmailAndUsernameToLowerCase(
    event: InsertEvent<UserEntity> | UpdateEvent<UserEntity>,
  ): void {
    if (event.entity?.email) {
      event.entity.email = event.entity.email.toLowerCase();
    }

    if (event.entity?.username) {
      event.entity.username = event.entity.username.toLowerCase();
    }
  }

  private setUsernameFromEmail(
    event: InsertEvent<UserEntity> | UpdateEvent<UserEntity>,
  ): void {
    if (event.entity?.email) {
      event.entity.username = event.entity.email;
    }
  }
}
