import { Currency } from '../../../../services/currency-service/model/Currency';
import * as Yup from 'yup';
export interface CreateCustomerPageForm {
  fullName: string;
  phone: string;
  currency?: Currency;
}

export const createCustomerValidationSchema = Yup.object({
  fullName: Yup.string()
    .required('Customer name is required')
    .min(3, 'Customer name min length is 3')
    .max(56, 'Customer name max length is 56'),
  phone: Yup.string()
    .required('Phone number is rquired')
    .min(10, 'Phone min length is 10')
    .matches(/[0-9]/, 'Invalid Phone number'),
  currency: Yup.object({
    id: Yup.number().required(),
  }).required(),
});
