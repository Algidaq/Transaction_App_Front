import { Role } from '../../role-pages/create-role-page/UserRoleForm';
import * as Yup from 'yup';
export interface CreateUserPageForm {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?: Role;
}

export const createUserValidationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name min length is 3')
    .max(56, 'FullName max length is 56'),
  phone: Yup.string()
    .required('Phone number is Required')
    .min(10, 'Min length is 10')
    .max(56, 'Max length is 56')
    .matches(RegExp(/[0-9]/), 'Invalid Phone number'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password min length is 3')
    .max(56, 'Password max length is 56'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .min(4, 'Password min length is 3')
    .max(56, 'Password max length is 56'),
  role: Yup.object({
    id: Yup.number().required(),
    role: Yup.string().required(),
  }).required(),
});
