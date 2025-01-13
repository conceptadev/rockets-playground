import { CommonPostgresEntity } from '@concepta/typeorm-common';
import { ProductInterface, StoreInterface } from 'rockets-playground-common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreEntity } from '../store/store.entity';

@Entity('product')
export class ProductEntity
  extends CommonPostgresEntity
  implements ProductInterface
{
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ nullable: false })
  storeId: string;

  @ManyToOne(() => StoreEntity, (store) => store.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'storeId' })
  store?: StoreInterface;
}
