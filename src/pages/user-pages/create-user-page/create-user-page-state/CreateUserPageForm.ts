import { Role } from '../../../role-pages/create-role-page/UserRoleForm';
import * as Yup from 'yup';
import { required, invalid } from '../../../../utils/utils';
export interface CreateUserPageForm {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role?: Role;
}

export const createUserValidationSchema = Yup.object({
  fullName: Yup.string().required(required).min(3, invalid).max(56, invalid),
  phone: Yup.string()
    .required(required)
    .min(10, invalid)
    .max(56, invalid)
    .matches(RegExp(/[0-9]/), invalid),
  password: Yup.string().required(required).min(4, invalid).max(56, invalid),
  confirmPassword: Yup.string()
    .required(required)
    .min(4, invalid)
    .max(56, invalid),
  role: Yup.object({
    id: Yup.number().required(),
    role: Yup.string().required(),
  }).required(),
});
