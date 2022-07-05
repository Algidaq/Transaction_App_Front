import { createContext } from 'react';
import { IAuthService } from './AuthService';

export const AuthServiceContext = createContext<IAuthService | null>(null);
