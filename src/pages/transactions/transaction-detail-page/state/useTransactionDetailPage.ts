import { useState, useEffect } from 'react';
import { ITransactionService } from '../../../../services/transaction-service/TransactionService';
import { TransactionDetailPageState } from './TransactionDetailPageState';
import { StateEnum } from '../../../../enums/StateEnum';
import { useParams } from 'react-router-dom';
export const useTransactionDetailPage = ({
  service,
}: {
  service: ITransactionService;
}) => {
  const [state, setState] = useState(
    new TransactionDetailPageState(StateEnum.idel)
  );
  const transactionId = useParams().id ?? 'N/A';
  useEffect(() => {
    async function getData() {
      await loadTransaction();
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadTransaction() {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const transaction = await service.getTransactionById(transactionId);
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.success, transaction })
      );
    } catch (e: any) {
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
    }
  }

  return { state, loadTransaction };
};
