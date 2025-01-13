import { Seeder } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { StoreFactory } from '../store/store.factory';
import { ProductFactory } from '../product/product.factory';

export class StoreProductSeeder extends Seeder {
  async run() {
    const storeFactory = this.factory(StoreFactory);
    const productFactory = this.factory(ProductFactory);

    const stores = await storeFactory.createMany(10);

    for (const store of stores) {
      const productCount = faker.number.int({ min: 5, max: 15 });

      await productFactory.createMany(productCount, { store });
    }
  }
}
