import { StoreInterface } from './store.interface';

export interface StoreUpdatableInterface
  extends Partial<
    Pick<
      StoreInterface,
      | 'name'
      | 'address'
      | 'email'
      | 'phoneNumber'
      | 'description'
      | 'city'
      | 'state'
      | 'zipCode'
      | 'openingTime'
      | 'closingTime'
      | 'active'
    >
  > {}
