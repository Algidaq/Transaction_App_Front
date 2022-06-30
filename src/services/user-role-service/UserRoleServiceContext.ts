import { createContext } from 'react';
import { IUserRoleService } from './UserRoleService';

export const UserRoleServiceContext = createContext<IUserRoleService | null>(
  null
);
