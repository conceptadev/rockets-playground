import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { StoreEntity } from './store.entity';

export class StoreFactory extends Factory<StoreEntity> {
  protected async entity(
    store: StoreEntity = new StoreEntity(),
  ): Promise<StoreEntity> {
    store.name = faker.company.name();
    store.email = faker.internet.email();
    store.phoneNumber = faker.phone.number();
    store.address = faker.location.streetAddress();
    store.description = faker.lorem.sentence();
    store.city = faker.location.city();
    store.state = faker.location.state();
    store.zipCode = faker.location.zipCode();
    store.openingTime = faker.helpers.arrayElement([
      '08:00:00',
      '09:00:00',
      '10:00:00',
    ]);
    store.closingTime = faker.helpers.arrayElement([
      '18:00:00',
      '19:00:00',
      '20:00:00',
    ]);
    store.active = faker.datatype.boolean();

    return store;
  }
}
