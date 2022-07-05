import * as Yup from 'yup';
import { required, invalid } from '../../../../utils/utils';
export interface CreateCurrencyPageForm {
  name: string;
  symbol: string;
}

export const createCurrencyValidateSchema = Yup.object({
  name: Yup.string().required(required).min(3, invalid).max(56, invalid),
  symbol: Yup.string().required(required).min(1, invalid),
});
