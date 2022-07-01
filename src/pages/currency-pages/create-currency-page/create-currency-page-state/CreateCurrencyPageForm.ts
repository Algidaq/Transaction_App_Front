import * as Yup from 'yup';
export interface CreateCurrencyPageForm {
  name: string;
  symbol: string;
}

export const createCurrencyValidateSchema = Yup.object({
  name: Yup.string()
    .required('Currency name is required')
    .min(3, 'Currency min length is 3')
    .max(56, 'Currency name max length is 56'),
  symbol: Yup.string()
    .required('Currency Symbol is required')
    .min(1, 'Currency Symbol min length is 1'),
});
