import { createContext } from 'react';
import { ICustomerService } from '../CustomerService';
export const CustomerServiceContext = createContext<ICustomerService | null>(
  null
);
