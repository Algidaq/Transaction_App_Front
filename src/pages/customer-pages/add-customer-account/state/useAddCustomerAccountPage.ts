import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { ICurrencyService } from '../../../../services/currency-service/CurrencyService';
import { useState, useEffect } from 'react';
import { AddCustomerAccountPageState } from './AddCustomerAccountPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { Currency } from '../../../../services/currency-service/model/Currency';

export const useAddCustomerAccountPage = ({
  customerService,
  currencyService,
}: {
  customerService: ICustomerService;
  currencyService: ICurrencyService;
}) => {
  const [state, setState] = useState(
    new AddCustomerAccountPageState(StateEnum.idel, StateEnum.idel)
  );
  const customerId = useParams().id ?? 'N/A';
  const navigateTo = useNavigate();
  useEffect(() => {
    async function getData() {
      await loadAllData();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAllData() {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const [customer, currencies] = await Promise.all([
        customerService.getCustomerById(customerId),
        currencyService.getAllCurrency(),
      ]);
      const allCurrency = Currency.fromJson({
        id: -1,
        name: 'Select Currency',
        symbol: '',
      });
      const updatedCurrencies = [allCurrency, ...currencies];
      setState((state) =>
        state.copyWith({
          stateEnum:
            updatedCurrencies.length === 0
              ? StateEnum.empty
              : StateEnum.success,
          currencies: updatedCurrencies,
          selectedCurrency:
            updatedCurrencies.length === 0 ? undefined : allCurrency,
          customer: customer,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }

  const handleOnCurrencyChange = (id: string) => {
    if (id === '-1') return;
    const currency = state.currencies.find(
      (element) => element.id === Number.parseInt(id)
    );
    if (!currency) return;
    const index = state.customer!.accounts.findIndex(
      (element) => element.currency.id !== currency.id
    );
    setState((state) =>
      state.copyWith({
        selectedCurrency: currency,
        isButtonDisabled: index === -1,
      })
    );
  };

  const handleOnEmptyClick = () => {
    navigateTo('/currencies/add');
  };

  async function addCustomerAccount(e: any) {
    try {
      setState((state) => state.copyWith({ formState: StateEnum.busy }));
      await customerService.accountService.addNewAccount(customerId, {
        currency: state.selectedCurrency!.toGetJson(),
      });
      setState((state) => state.copyWith({ formState: StateEnum.success }));
      toast.success('Customer Account as been add Successfully');
      setTimeout(() => {
        navigateTo('/customers');
      }, 2000);
    } catch (e) {
      toast.error(getErrorMessage(e));
      setState((state) => state.copyWith({ formState: StateEnum.error }));
    }
  }

  return {
    state,
    handleOnCurrencyChange,
    loadAllData,
    handleOnEmptyClick,
    addCustomerAccount,
  };
};
