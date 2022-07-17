import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { ICurrencyService } from '../../../../services/currency-service/CurrencyService';
import { useState, useEffect } from 'react';
import { AddCustomerAccountPageState } from './AddCustomerAccountPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';

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

      setState((state) =>
        state.copyWith({
          stateEnum:
            currencies.length === 0 ? StateEnum.empty : StateEnum.success,
          currencies: currencies,
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
    const selectedCurrency = state.currencies.find(
      (element) => element.id === Number.parseInt(id)
    );
    if (!selectedCurrency) return;

    const accountNotExists =
      state.customer!.accounts.findIndex(
        (element) => element.currency.id !== selectedCurrency.id
      ) === -1;
    setState((state) =>
      state.copyWith({
        selectedCurrency: selectedCurrency,
        isButtonDisabled:
          accountNotExists && state.customer!.accounts.length > 0,
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
