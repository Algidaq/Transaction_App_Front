import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CreateRolePage from './pages/create-role-page/CreateRolePage';
import { UserRoleServiceContext } from './services/user-role-service/UserRoleServiceContext';
import { UserRoleService } from './services/user-role-service/UserRoleService';
import CreateUserPage from './pages/create-user-page/CreateUserPage';
import { UserServiceContext } from './services/user-service/context/UserServiceContext';
import { UserService } from './services/user-service/UserService';
import { ToastContainer } from 'react-toastify';
import { CurrencyServiceContext } from './services/currency-service/context/CurrencyServiceContext';
import { CurrencyService } from './services/currency-service/CurrencyService';
import CreateCurrencyPage from './pages/create-currency-page/CreateCurrencyPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrencyServiceContext.Provider value={new CurrencyService()}>
        <UserServiceContext.Provider value={new UserService()}>
          <UserRoleServiceContext.Provider value={new UserRoleService()}>
            <CreateCurrencyPage />
            <ToastContainer />
          </UserRoleServiceContext.Provider>
        </UserServiceContext.Provider>
      </CurrencyServiceContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
