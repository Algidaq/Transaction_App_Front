import { INavbarItem } from '../components/Navbar/model/INavbarItem';

export const routes: INavbarItem[] = [
  {
    groupName: ' ادارة المستخدمين',
    groupPath: '/users',
    navLinks: [
      { navName: 'المستخدمبن', navPath: '?role=-1' },
      { navName: 'إضافة مستخدم', navPath: '/add' },
      { navName: 'مسؤوليات المستخدمين', navPath: '/roles' },
      { navName: 'أضافة مسؤولية', navPath: '/roles/add' },
    ],
  },
  {
    groupName: 'العملات',
    groupPath: '/currencies',
    navLinks: [
      { navName: 'أضافة عملة', navPath: '/add' },
      { navName: 'قائمة العملات', navPath: '' },
    ],
  },
  {
    groupName: 'العملاء',
    groupPath: '/customers',
    navLinks: [
      { navName: 'أضافة عميل', navPath: '/add' },
      { navName: 'قائمة العملاء', navPath: '' },
    ],
  },

  {
    groupName: 'المعاملات',
    groupPath: '/transactions',
    navLinks: [{ navName: 'قائمة المعاملات', navPath: '/' }],
  },
];
