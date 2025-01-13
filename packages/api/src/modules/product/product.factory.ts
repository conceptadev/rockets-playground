import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { ProductEntity } from './product.entity';

export class ProductFactory extends Factory<ProductEntity> {
  protected async entity(
    product: ProductEntity = new ProductEntity(),
  ): Promise<ProductEntity> {
    product.name = faker.commerce.productName();
    product.description = faker.commerce.productDescription();
    product.imageUrl = faker.image.urlLoremFlickr({
      width: 640,
      height: 480,
      category: 'product',
    });
    product.active = faker.datatype.boolean();
    product.price = Number(faker.commerce.price({ min: 1, max: 2000 }));
    product.stock = faker.number.int({ min: 0, max: 100 });

    return product;
  }
}
