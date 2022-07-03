import { INavbarItem } from '../components/Navbar/model/INavbarItem';

export const routes: INavbarItem[] = [
  {
    groupName: 'User Management',
    groupPath: '/users',
    navLinks: [
      { navName: 'User list', navPath: '?role=-1' },
      { navName: 'Add User', navPath: '/add' },
      { navName: 'User Roles', navPath: '/roles' },
      { navName: 'Add Roles', navPath: '/roles/add' },
    ],
  },
];
