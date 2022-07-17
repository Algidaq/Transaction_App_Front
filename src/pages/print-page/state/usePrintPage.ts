import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  IGetCustomerStatement,
  ITransactionService,
} from '../../../services/transaction-service/TransactionService';
import { PrintPageState } from './PrintPageState';
import { StateEnum } from '../../../enums/StateEnum';

export const usePrintPage = ({ service }: { service: ITransactionService }) => {
  const [state, setState] = useState(new PrintPageState(StateEnum.idel));
  const { id: customerId } = useParams();
  const [params] = useSearchParams({
    fromDate: new Date().toLocaleDateString('en'),
    toDate: new Date().toLocaleDateString(),
  });
  useEffect(() => {
    async function getData() {
      await loadStatementData();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadStatementData() {
    try {
      const body: IGetCustomerStatement = {
        customerId: customerId ?? 'N/A',
        fromDate: params.get('fromDate') ?? 'N/A',
        toDate: params.get('toDate') ?? 'N/A',
      };
      console.log(body);
      const data = await service.getCustomerTransactionStatement(body);
      setState((state) =>
        state.copyWith({
          stateEnum:
            data.transactions.length < 1 ? StateEnum.empty : StateEnum.success,
          customer: data.customer,
          transactions: data.transactions,
        })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }
  return {
    state,
    loadStatementData,
    fromDate: params.get('fromDate') ?? 'N/A',
    toDate: params.get('toDate') ?? 'N/A',
  };
};
