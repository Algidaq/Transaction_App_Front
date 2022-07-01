import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CreateRolePage from './pages/role-pages/create-role-page/CreateRolePage';
import { UserRoleServiceContext } from './services/user-role-service/UserRoleServiceContext';
import { UserRoleService } from './services/user-role-service/UserRoleService';
import CreateUserPage from './pages/user-pages/create-user-page/CreateUserPage';
import { UserServiceContext } from './services/user-service/context/UserServiceContext';
import { UserService } from './services/user-service/UserService';
import { ToastContainer } from 'react-toastify';
import { CurrencyServiceContext } from './services/currency-service/context/CurrencyServiceContext';
import { CurrencyService } from './services/currency-service/CurrencyService';
import CreateCurrencyPage from './pages/currency-pages/create-currency-page/CreateCurrencyPage';
import CreateCustomerPage from './pages/customer-pages/create-customer-page/CreateCustomerPage';
import { CustomerServiceContext } from './services/customer-service/context/CustomerServiceContext';
import { CustomerService } from './services/customer-service/CustomerService';
import { CustomerAccountService } from './services/customer-service/CustomerAccountService';
import CurrencyListPage from './pages/currency-pages/currency-list-page/CurrencyListPage';
import RoleListPage from './pages/role-pages/role-list-page/RoleListPage';
import UserListPage from './pages/user-pages/user-list-page/UserListPage';
import CustomerListPage from './pages/customer-pages/customer-list-page/CustomerListPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerServiceContext.Provider
        value={new CustomerService(new CustomerAccountService())}
      >
        <CurrencyServiceContext.Provider value={new CurrencyService()}>
          <UserServiceContext.Provider value={new UserService()}>
            <UserRoleServiceContext.Provider value={new UserRoleService()}>
              <CustomerListPage />
              <ToastContainer />
            </UserRoleServiceContext.Provider>
          </UserServiceContext.Provider>
        </CurrencyServiceContext.Provider>
      </CustomerServiceContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
