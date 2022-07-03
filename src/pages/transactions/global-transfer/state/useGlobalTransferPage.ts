import { useState, useEffect } from 'react';
import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { StateEnum } from '../../../../enums/StateEnum';
import { GlobalTransferPageState } from './GlobalTransferPageState';
import { ICurrencyService } from '../../../../services/currency-service/CurrencyService';
export const useGlobalTransferPage = ({
  customerId,
  service,
  currencyService,
}: {
  customerId: string;
  service: ICustomerService;
  currencyService: ICurrencyService;
}) => {
  const [state, setState] = useState(
    new GlobalTransferPageState(StateEnum.idel)
  );

  useEffect(() => {
    async function getData() {
      loadCustomerAndCurrencies();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCustomerAndCurrencies = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const [customer, currencies] = await Promise.all([
        service.getCustomerById(customerId),
        currencyService.getAllCurrency(),
      ]);

      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.success, customer, currencies })
      );
    } catch (e: any) {
      console.error(e);
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };
  return { state, loadCustomerAndCurrencies };
};
