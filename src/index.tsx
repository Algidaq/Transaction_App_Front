import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { UserRoleServiceContext } from './services/user-role-service/UserRoleServiceContext';
import { UserRoleService } from './services/user-role-service/UserRoleService';
import { UserServiceContext } from './services/user-service/context/UserServiceContext';
import { UserService } from './services/user-service/UserService';
import { ToastContainer } from 'react-toastify';
import { CurrencyServiceContext } from './services/currency-service/context/CurrencyServiceContext';
import { CurrencyService } from './services/currency-service/CurrencyService';
import { CustomerServiceContext } from './services/customer-service/context/CustomerServiceContext';
import { CustomerService } from './services/customer-service/CustomerService';
import { CustomerAccountService } from './services/customer-service/CustomerAccountService';
import { TransactionServiceContext } from './services/transaction-service/context/TransactionServiceContext';
import { TransactionService } from './services/transaction-service/TransactionService';
import LoginPage from './pages/login-page/LoginPage';
import { AuthServiceContext } from './services/auth-service/AuthServiceContext';
import { AuthService } from './services/auth-service/AuthService';
import { LocalStorageService } from './services/auth-service/LocalStorage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthServiceContext.Provider
        value={new AuthService(new LocalStorageService())}
      >
        <TransactionServiceContext.Provider value={new TransactionService()}>
          <CustomerServiceContext.Provider
            value={new CustomerService(new CustomerAccountService())}
          >
            <CurrencyServiceContext.Provider value={new CurrencyService()}>
              <UserServiceContext.Provider value={new UserService()}>
                <UserRoleServiceContext.Provider value={new UserRoleService()}>
                  <App />
                  <ToastContainer />
                </UserRoleServiceContext.Provider>
              </UserServiceContext.Provider>
            </CurrencyServiceContext.Provider>
          </CustomerServiceContext.Provider>
        </TransactionServiceContext.Provider>
      </AuthServiceContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
