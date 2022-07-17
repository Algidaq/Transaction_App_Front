import { ICurrencyService } from '../../../../services/currency-service/CurrencyService';
import { CreateCustomerPageForm } from './CreateCustomerPageForm';
import { useEffect } from 'react';
import React from 'react';
import { CreateCustomerPageState } from './CreateCustomerPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { FormikHelpers, FormikProps } from 'formik';
import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { IPostCustomer } from '../../../../services/customer-service/model/Customer';
import { IPostCustomerAccount } from '../../../../services/customer-service/model/Account';
import { Currency } from '../../../../services/currency-service/model/Currency';

export const useCreateCustomerPage = ({
  currencyService,
  customerService,
}: {
  currencyService: ICurrencyService;
  customerService: ICustomerService;
}) => {
  const initialValues: CreateCustomerPageForm = {
    fullName: '',
    phone: '',
    currency: undefined,
  };
  const [state, setState] = React.useState(
    new CreateCustomerPageState(StateEnum.idel, StateEnum.idel)
  );
  useEffect(() => {
    async function getData() {
      await loadCurrencies();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCurrencies = async () => {
    try {
      setState((state) => state.copyWith({ currencyState: StateEnum.busy }));
      const _currencies = await currencyService.getAllCurrency();
      const currencies = [
        Currency.fromJson({ id: -1, name: 'اختر العملة', symbol: '' }),
        ..._currencies,
      ];
      setState((state) =>
        state.copyWith({
          currencies,
          currencyState:
            currencies.length > 0 ? StateEnum.success : StateEnum.empty,
        })
      );
    } catch (e) {
      toast.error(getErrorMessage(e));
      setState((state) => state.copyWith({ currencyState: StateEnum.error }));
    }
  };

  const handleOnFormSubmit = async (
    values: CreateCustomerPageForm,
    helpers: FormikHelpers<CreateCustomerPageForm>
  ) => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const postCustomer: IPostCustomer = {
        fullName: values.fullName,
        phone: values.phone,
      };
      const customer = await customerService.addNewCustomer(postCustomer);
      const postAccount: IPostCustomerAccount = {
        currency: values.currency!.toGetJson(),
      };
      const account = await customerService.accountService.addNewAccount(
        customer.id,
        postAccount
      );
      setState((state) => state.copyWith({ stateEnum: StateEnum.success }));
      toast.success(`تم اضافة العميل ${customer.name} بنجاح`);
    } catch (e) {
      setState((state) => state.copyWith({ stateEnum: StateEnum.error }));
      toast.error(getErrorMessage(e));
    } finally {
      helpers.resetForm();
    }
  };

  const handleOnCurrencySelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    formik: FormikProps<CreateCustomerPageForm>
  ) => {
    const currencyId = Number.parseInt(e.target.value);
    const currency = state.currencies.find(
      (element) => element.id === currencyId
    );
    if (!currency) return;
    formik.setFieldValue('currency', currency);
    return;
  };
  return {
    initialValues,
    state,
    handleOnFormSubmit,
    handleOnCurrencySelectionChange,
  };
};
