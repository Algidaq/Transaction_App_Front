import { Currency } from '../../../../services/currency-service/model/Currency';
import { Customer } from '../../../../services/customer-service/model/Customer';
import {
  ITransactionService,
  IPostGlobalTransfer,
} from '../../../../services/transaction-service/TransactionService';
import { useState } from 'react';
import { GlobalTransferFormState } from './GlobalTransferFormState';
import { StateEnum } from '../../../../enums/StateEnum';
import { IDepositeForm } from '../../deposite-page/components/DepositeForm/state/useDepositeForm';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { getErrorMessage, invalid, required } from '../../../../utils/utils';
import { toast } from 'react-toastify';
export const useGlobalTransferForm = ({
  customer,
  currencies,
  service,
}: {
  customer: Customer;
  currencies: Currency[];
  service: ITransactionService;
}) => {
  const initialFromAccount =
    customer.accounts.length > 0 ? customer.accounts[0] : undefined;

  const [state, setState] = useState(
    new GlobalTransferFormState(
      StateEnum.idel,
      customer,
      initialFromAccount,
      currencies
    )
  );

  const initialValues: IGlobalTransferFrom = {
    fromAccount: initialFromAccount,
    fullName: '',
    amount: 0,
  };
  async function handleOnFormSubmit(
    values: IGlobalTransferFrom,
    helpers: FormikHelpers<IGlobalTransferFrom>
  ) {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const body = getPostData(values);
      const transaction = await service.handleGlobalTransfer(body);
      setState((state) =>
        state.copyWith({
          stateEnum: StateEnum.success,
          fromAccount: transaction.fromAccount,
        })
      );
      toast.success('تمت العملية بنجاح');
      console.log(transaction);
    } catch (e: any) {
      toast.error(getErrorMessage(e));
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    } finally {
      helpers.resetForm();
    }
  }

  function getPostData(values: IGlobalTransferFrom): IPostGlobalTransfer {
    return {
      customer: customer.toGetJson(),
      fromAccount: state.fromAccount!.toGetJson(),
      amount: values.amount,
      exchangeRate: {
        rate: Number.parseFloat(values.rate ?? '-1') ?? -1,
        toCurrency: state.toCurrency!.toGetJson(),
      },
      transactionInfo: {
        fullName: values.fullName,
        phone: values.phone && values.phone !== '' ? values.phone : undefined,
        bankAccount:
          values.bankAccount && values.bankAccount !== ''
            ? values.bankAccount
            : undefined,
      },
      comment: values.comment && values.comment !== '' ? values.comment : 'N/A',
    };
  }

  function handleFormValidation(values: IGlobalTransferFrom) {
    if (!values.fromAccount) return { fromAccount: 'From Account is required' };
    if (!values.toCurrency) return { toCurrency: 'To currency is required' };
    if (values.toCurrency !== values.fromAccount.currency && !values.rate) {
      return { rate: 'Exchange rate is required' };
    }
    return;
  }

  function handleOnFromAccountChange(
    accountId: string,
    formik: FormikProps<IGlobalTransferFrom>
  ) {
    const account = state.customer.accounts.find(({ id }) => id === accountId);
    if (!account) return;
    formik.setFieldValue('fromAccount', account);
    setState((state) => state.copyWith({ fromAccount: account }));
  }

  function handleOnToCurrencyChange(
    currencyId: number,
    formik: FormikProps<IGlobalTransferFrom>
  ) {
    const toCurrency = state.currencies.find(({ id }) => id === currencyId);
    if (!toCurrency) return;
    formik.setFieldValue('toCurrency', toCurrency);
    const showRate = showExchangeRate(formik);
    setState((state) => state.copyWith({ toCurrency, showRate }));
  }

  function showExchangeRate(formik: FormikProps<IGlobalTransferFrom>): boolean {
    if (!state.toCurrency) return false;
    if (state.toCurrency.id === state.fromAccount?.currency.id) {
      formik.setFieldValue('rate', 1);
      return false;
    }
    return true;
  }

  function handleExchangeRateKeyDown(
    key: string,
    formik: FormikProps<IGlobalTransferFrom>
  ) {
    if (key !== 'Enter') return;
    try {
      const value = eval(formik.values.rate ?? '');
      if (isNaN(value)) return;
      formik.setFieldValue('rate', value);
      setState((state) =>
        state.copyWith({
          exchangeRate: Number.parseFloat(formik.values.rate ?? '0'),
        })
      );
      console.log(state);
    } catch (e) {
      console.log(e);
    }
  }

  function getExchangedAmount(
    formik: FormikProps<IGlobalTransferFrom>
  ): string {
    if (isNaN(Number.parseFloat(formik.values?.rate ?? 'N/A'))) return '';
    if (formik.errors.amount || formik.values.amount < 1) return '';
    if (formik.errors.rate || (formik.values?.rate ?? -1) <= 0) return '';
    const rate = Number.parseFloat(formik.values.rate ?? '1');
    const exchangeRate = formik.values.amount * rate;
    if (exchangeRate === 0) return '';
    return `exchanged amount is ${exchangeRate.toLocaleString('en')} ${
      state.toCurrency?.symbol
    }`.trim();
  }

  return {
    state,
    initialValues,
    handleOnFormSubmit,
    handleFormValidation,
    handleOnFromAccountChange,
    handleOnToCurrencyChange,
    showExchangeRate,
    handleExchangeRateKeyDown,
    getExchangedAmount,
  };
};

export interface IGlobalTransferFrom extends IDepositeForm {
  toCurrency?: Currency;
  rate?: string;
  fullName: string;
  phone?: string;
  bankAccount?: string;
}

export const globalTransferValidationSchema = Yup.object({
  fromAccount: Yup.object({ id: Yup.string().required() }).required(
    'اختار الحساب المرسل منه'
  ),
  amount: Yup.number().required(required).moreThan(0, invalid),
  comment: Yup.string(),
  toCurrency: Yup.object({ id: Yup.number().required() }).required(),
  rate: Yup.string().matches(/[0-9./]/),
  fullName: Yup.string().required(required).min(3, invalid).max(56, invalid),
  phone: Yup.string().matches(/[0-9]/, 'Invalid From Account').min(9, invalid),
  bankAccount: Yup.string().matches(/[0-9]/, invalid).min(5, invalid),
});
