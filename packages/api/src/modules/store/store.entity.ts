import { CommonPostgresEntity } from '@concepta/typeorm-common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductInterface, StoreInterface } from 'rockets-playground-common';
import { ProductEntity } from '../product/product.entity';

@Entity('store')
export class StoreEntity
  extends CommonPostgresEntity
  implements StoreInterface
{
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ type: 'time', nullable: true })
  openingTime: string;

  @Column({ type: 'time', nullable: true })
  closingTime: string;

  @Column({ nullable: true })
  active: boolean;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductInterface[];
}
