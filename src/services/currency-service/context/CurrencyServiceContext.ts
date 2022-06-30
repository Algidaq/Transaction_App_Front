import { createContext } from 'react';
import { ICurrencyService } from '../CurrencyService';
export const CurrencyServiceContext = createContext<ICurrencyService | null>(
  null
);
