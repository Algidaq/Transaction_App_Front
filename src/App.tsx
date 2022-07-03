import * as React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import CreateUserPage from './pages/user-pages/create-user-page/CreateUserPage';
import UsersOutlet from './pages/user-pages/UsersOutlet';
import UserListPage from './pages/user-pages/user-list-page/UserListPage';
import RoleListPage from './pages/role-pages/role-list-page/RoleListPage';
import CreateRolePage from './pages/role-pages/create-role-page/CreateRolePage';
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
        </Routes>
      </main>
    </div>
  );
};

export default App;
