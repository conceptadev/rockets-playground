import { Seeder } from '@concepta/typeorm-seeding';
import { StoreProductSeeder } from './modules/store/store.seeder';
import { StoreFactory } from './modules/store/store.factory';

export class AppSeeder extends Seeder {
  async run() {
    const storeProductSeeder = new StoreProductSeeder({
      factories: [new StoreFactory()],
    });

    await this.call([storeProductSeeder]);
  }
}
