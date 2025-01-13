import { StoreInterface } from './store.interface';

export interface StoreCreatableInterface
  extends Pick<StoreInterface, 'name' | 'address' | 'email' | 'phoneNumber'>,
    Partial<
      Pick<
        StoreInterface,
        | 'description'
        | 'city'
        | 'state'
        | 'zipCode'
        | 'openingTime'
        | 'closingTime'
        | 'active'
      >
    > {}
