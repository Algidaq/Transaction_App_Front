import * as React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { Outlet, Route, Routes } from 'react-router-dom';
import CreateUserPage from './pages/user-pages/create-user-page/CreateUserPage';
import UsersOutlet from './pages/user-pages/UsersOutlet';
import UserListPage from './pages/user-pages/user-list-page/UserListPage';
import RoleListPage from './pages/role-pages/role-list-page/RoleListPage';
import CreateRolePage from './pages/role-pages/create-role-page/CreateRolePage';
import CurrencyListPage from './pages/currency-pages/currency-list-page/CurrencyListPage';
import CreateCurrencyPage from './pages/currency-pages/create-currency-page/CreateCurrencyPage';
import CurrencyOutlet from './pages/currency-pages/CurrencyOutlet';
import CustomerOutlet from './pages/customer-pages/CustomerOutlet';
import CreateCustomerPage from './pages/customer-pages/create-customer-page/CreateCustomerPage';
import CustomerListPage from './pages/customer-pages/customer-list-page/CustomerListPage';
import DepositePage from './pages/transactions/deposite-page/DepositePage';
import GlobalTransferPage from './pages/transactions/global-transfer/GlobalTransferPage';
import TransactionListPage from './pages/transactions/transaction-list-page/TransactionListPage';
import AddCustomerAccountPage from './pages/customer-pages/add-customer-account/AddCustomerAccount';
import EditCustomerPage from './pages/customer-pages/edit-customer-page/EditCustomerPage';
import TransactionDetail from './pages/transactions/transaction-detail-page/TransactionDetailPage';

const App: React.FC<{}> = () => {
  return (
    <div className="app is-fullheight">
      <Navbar></Navbar>
      <main className="container m-1">
        <Routes>
          <Route path="users" element={<UsersOutlet />}>
            <Route path="add" element={<CreateUserPage />} />
            <Route path="roles" element={<RoleListPage />} />
            <Route path="roles/add" element={<CreateRolePage />} />
            <Route path="" element={<UserListPage />} />
          </Route>
          <Route path="currencies" element={<CurrencyOutlet />}>
            <Route path="add" element={<CreateCurrencyPage />} />
            <Route path="" element={<CurrencyListPage />} />
          </Route>
          <Route path="transfer" element={<TransferOutlet />}>
            <Route
              path="deposite/:id"
              element={<DepositePage transactionType={'deposite'} />}
            />
            <Route
              path="withdraw/:id"
              element={<DepositePage transactionType={'withdraw'} />}
            />
            <Route
              path="global-transfer/:id"
              element={<GlobalTransferPage />}
            />
          </Route>
          <Route path="customers" element={<CustomerOutlet />}>
            <Route path=":id/edit" element={<EditCustomerPage />} />

            <Route
              path=":id/accounts/add"
              element={<AddCustomerAccountPage />}
            />

            <Route path="add" element={<CreateCustomerPage />} />
            <Route path="" element={<CustomerListPage />} />
          </Route>
          <Route path="transactions" element={<CustomerOutlet />}>
            <Route path="" element={<TransactionListPage />} />
            <Route path=":id" element={<TransactionDetail />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

const TransferOutlet: React.FC<{}> = () => {
  return <Outlet />;
};

export default App;
