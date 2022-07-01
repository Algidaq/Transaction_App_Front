import { createContext } from 'react';
import { ITransactionService } from '../TransactionService';

export const TransactionServiceContext =
  createContext<ITransactionService | null>(null);
