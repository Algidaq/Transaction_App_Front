import { createContext } from 'react';
import { IUserService } from '../UserService';
export const UserServiceContext = createContext<IUserService | null>(null);
