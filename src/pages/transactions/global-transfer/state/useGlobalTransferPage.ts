import { useState, useEffect } from 'react';
import { ICustomerService } from '../../../../services/customer-service/CustomerService';
import { StateEnum } from '../../../../enums/StateEnum';
import { GlobalTransferPageState } from './GlobalTransferPageState';
import { ICurrencyService } from '../../../../services/currency-service/CurrencyService';
import { useParams } from 'react-router-dom';
export const useGlobalTransferPage = ({
  service,
  currencyService,
}: {
  service: ICustomerService;
  currencyService: ICurrencyService;
}) => {
  const [state, setState] = useState(
    new GlobalTransferPageState(StateEnum.idel)
  );
  const params = useParams();
  const customerId = params.id ?? 'N/A';

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
