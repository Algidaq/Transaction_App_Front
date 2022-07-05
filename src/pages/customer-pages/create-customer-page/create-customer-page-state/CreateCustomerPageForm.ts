import { Currency } from '../../../../services/currency-service/model/Currency';
import * as Yup from 'yup';
import { required, invalid } from '../../../../utils/utils';
export interface CreateCustomerPageForm {
  fullName: string;
  phone: string;
  currency?: Currency;
}

export const createCustomerValidationSchema = Yup.object({
  fullName: Yup.string().required(required).min(3, invalid).max(56, invalid),
  phone: Yup.string()
    .required(required)
    .min(10, invalid)
    .matches(/[0-9]/, invalid),
  currency: Yup.object({
    id: Yup.number().required(),
  }).required(),
});
