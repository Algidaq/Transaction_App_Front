import { ICurrencyService } from '../../../../services/currency-service/CurrencyService';
import { useEffect, useState } from 'react';
import { CurrencyListPageState } from './CurrencyListPageState';
import { StateEnum } from '../../../../enums/StateEnum';

export const useCurrencyListPage = ({
  service,
}: {
  service: ICurrencyService;
}) => {
  const [state, setState] = useState(new CurrencyListPageState(StateEnum.idel));
  useEffect(() => {
    async function getData() {
      await loadAllCurrencies();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadAllCurrencies = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const currencies = await service.getAllCurrency();
      setState((state) =>
        state.copyWith({
          stateEnum:
            currencies.length > 0 ? StateEnum.success : StateEnum.empty,
          currencies,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  };

  return { state, loadAllCurrencies };
};
